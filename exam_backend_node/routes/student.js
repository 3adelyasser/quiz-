const express = require('express');
const router = express.Router();
const { Exam, Question, Result, Student } = require('../models');
const loginRequired = require('../utils/authMiddleware');

// Get all active exams
router.get('/exams', loginRequired('student'), async (req, res) => {
    try {
        const exams = await Exam.findAll({
            where: { is_active: true },
            attributes: ['id', 'title', 'description', 'duration', 'passing_score', 'created_at']
        });
        res.json(exams);
    } catch (error) {
        console.error('Get student exams error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Exam Details & Questions for Taking Exam
router.get('/exams/:id/questions', loginRequired('student'), async (req, res) => {
    try {
        const examId = req.params.id;
        const exam = await Exam.findByPk(examId, {
            where: { is_active: true },
            attributes: ['id', 'title', 'description', 'duration']
        });

        if (!exam) {
            return res.status(404).json({ message: 'Exam not found or inactive' });
        }

        const questions = await Question.findAll({
            where: { exam_id: examId },
            attributes: ['id', 'question_text', 'question_type', 'options', 'points'] // Exclude correct_answer
        });

        res.json({ exam, questions });
    } catch (error) {
        console.error('Get exam questions error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Submit Exam
router.post('/exams/:id/submit', loginRequired('student'), async (req, res) => {
    try {
        const examId = req.params.id;
        const studentId = req.currentUser.id;
        const { answers } = req.body; // { questionId: answer, ... }

        const exam = await Exam.findByPk(examId);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });

        const questions = await Question.findAll({ where: { exam_id: examId } });

        let autoScore = 0;
        let totalAuto = 0;
        let essayAnswers = [];
        let essayGrades = [];

        questions.forEach(q => {
            const studentAnswer = answers[q.id];

            if (q.question_type === 'essay') {
                essayAnswers.push({
                    questionId: q.id,
                    questionText: q.question_text,
                    answer: studentAnswer || '',
                    points: q.points
                });
                essayGrades.push({
                    questionId: q.id,
                    grade: null, // Pending
                    feedback: ''
                });
            } else {
                totalAuto += q.points;
                // Auto grading
                let isCorrect = false;
                if (q.question_type === 'multiple-choice') {
                    // correct_answer might be the text or index. My model stores text in correct_answer or I check options. 
                    // Wait, my Question model setup:
                    // options: JSON array of objects {text, correct}. 
                    // correct_answer: string (optional fallback or for calc).

                    if (q.options) {
                        const correctOpt = q.options.find(o => o.correct);
                        if (correctOpt && correctOpt.text === studentAnswer) isCorrect = true;
                    }
                } else if (q.question_type === 'calculation') {
                    if (parseFloat(studentAnswer) === parseFloat(q.correct_answer)) isCorrect = true;
                }

                if (isCorrect) autoScore += q.points;
            }
        });

        // Save Result
        const result = await Result.create({
            student_id: studentId,
            exam_id: examId,
            teacher_id: exam.created_by,
            score: autoScore, // Initial score (auto only)
            total_score: totalAuto, // Total points for auto questions? Or total exam points?
            // Actually Result model has `scores` JSON? 
            // Let's check Result model again.
            // Model: student_id, exam_id, teacher_id, scores (JSON), submission_time, status.
            // `scores` probably stores the breakdown.
            // I should use `scores` field for detailed breakdown.
            scores: {
                autoScore,
                totalAuto,
                answers,
                essayAnswers,
                essayGrades
            },
            status: essayAnswers.length > 0 ? 'pending' : 'graded'
        });

        res.json({
            message: 'Exam submitted successfully',
            resultId: result.id,
            autoScore,
            status: result.status
        });

    } catch (error) {
        console.error('Submit exam error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Select/Update teachers for student (post-registration)
router.post('/teachers/select', loginRequired('student'), async (req, res) => {
    try {
        const studentId = req.currentUser.id;
        const { teacherIds } = req.body;

        if (!Array.isArray(teacherIds) || teacherIds.length === 0) {
            return res.status(400).json({ message: 'Please select at least one teacher' });
        }

        const { Admin, StudentTeacher } = require('../models');

        // Validate all teacher IDs
        const validTeachers = await Admin.findAll({
            where: {
                id: teacherIds,
                role: 'teacher',
                is_active: true
            }
        });

        if (validTeachers.length !== teacherIds.length) {
            return res.status(400).json({
                message: 'Some teacher IDs are invalid or inactive'
            });
        }

        // Delete existing teacher links for this student
        await StudentTeacher.destroy({
            where: { student_id: studentId }
        });

        // Create new teacher links
        const studentTeacherLinks = validTeachers.map(teacher => ({
            student_id: studentId,
            teacher_id: teacher.id
        }));

        await StudentTeacher.bulkCreate(studentTeacherLinks);

        // Update legacy teacher_id field for backward compatibility
        const student = await Student.findByPk(studentId);
        student.teacher_id = validTeachers[0].id;
        await student.save();

        res.json({
            studentId,
            teacherIds: validTeachers.map(t => t.id),
            message: 'Teachers updated successfully'
        });

    } catch (error) {
        console.error('Select teachers error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
