@echo off
echo ======================================
echo Starting Node.js Exam System Backend
echo ======================================
echo.

cd exam_backend_node

echo Checking Node.js installation...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Starting server on port 5000...
echo.
echo Access the application at: http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

call npm start

pause
