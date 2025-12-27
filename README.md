# 🎓 Exam System (نظام الاختبارات الإلكتروني)

A comprehensive online exam management system with a **Node.js** backend and a modern frontend.
<br>
نظام متكامل لإدارة الاختبارات الإلكترونية يعتمد على **Node.js** في الخلفية (Backend) وواجهة مستخدم حديثة (Frontend).

---

## 🏗️ Project Structure

The project files are organized as follows to facilitate development:

- **📂 `frontend/`**: Contains all UI assets (HTML, CSS, JavaScript).
  - Student, Teacher, and Admin pages.
  - Styles and scripts.
- **📂 `exam_backend_node/`**: Contains the server-side logic and database.
  - `app.js`: Server entry point.
  - `models/`: Database models (SQLite).
  - `routes/`: API endpoints.

---

## 🚀 How to Run (كيفية التشغيل)

### Prerequisites (المتطلبات)
- Install **Node.js**. [Download Node.js](https://nodejs.org/)
<br>
- يجب تثبيت **Node.js** على جهازك.

### Steps (الخطوات)
1. Run the **`start_node_backend.bat`** file in the root directory.
   - This will install dependencies and start the server automatically.
2. The system should open automatically, or go to: **http://localhost:5000/**
<br>
1. قم بتشغيل الملف **`start_node_backend.bat`** الموجود في المجلد الرئيسي.
2. سيفتح النظام تلقائياً أو يمكنك الذهاب إلى الرابط أعلاه.

---

## 🔐 Default Credentials (بيانات الدخول الافتراضية)

The system supports Role-Based Access Control (RBAC).
<br>
النظام يدعم صلاحيات متعددة:

### 1️⃣ Super Admin (المسؤول العام)
- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@example.com`
- **Permissions**: Manage admins/teachers, full system access.
<br>
- **الصلاحيات**: إدارة المسؤولين والمعلمين، الوصول الكامل للنظام.

### 2️⃣ Teacher / Admin (المعلم)
- Created by Super Admin.
- **Permissions**: Create exams, grade students.
<br>
- **الصلاحيات**: إنشاء وتعديل الامتحانات، تصحيح الأسئلة.

### 3️⃣ Student (الطالب)
- **Experimental Account**:
- **Username**: `student@test.com`
- **Password**: `123456`
- **Permissions**: Take exams, view results.
<br>
- **الصلاحيات**: أداء الامتحانات، عرض النتائج.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite (`exam_system.db`)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Auth**: JWT (JSON Web Tokens)

---

## 📝 Important Notes (ملاحظات هامة)

- **Modifying Files**: Edit frontend files in `frontend/` and backend logic in `exam_backend_node/`.
- **Static Files**: The server serves frontend files from `frontend/` at `http://localhost:5000`.
<br>
- **تعديل الملفات**: ملفات الواجهة في `frontend/` والملفات الخلفية في `exam_backend_node/`.
- **الخادم**: يتم تقديم ملفات الواجهة عبر الرابط `http://localhost:5000`.

---

## 📞 Support (الدعم)
call me 

