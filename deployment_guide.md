# 🌐 Deployment Options (خيارات رفع الموقع)

Since your project uses **Node.js** for the backend (server & database), you cannot simply use **GitHub Pages** for the full application. GitHub Pages only hosts static files (HTML/CSS/JS) and cannot run server code.

بما أن مشروعك يعتمد على **Node.js** في الخلفية، لا يمكنك استخدام **GitHub Pages** لتشغيل التطبيق بالكامل. GitHub Pages مخصص فقط للملفات الثابتة ولا يمكنه تشغيل الخوادم.

---

## Option 1: Full App Deployment (Recommended)
### (تشغيل التطبيق بالكامل)

To make the login, exams, and database work, you need a hosting service that supports Node.js.
لتشغيل تسجيل الدخول والامتحانات بشكل صحيح، تحتاج إلى استضافة تدعم Node.js.

### **Recommended Free Services:**
1.  **Render (render.com)** - *Easiest / الأسهل*
2.  **Glitch (glitch.com)**
3.  **Replit (replit.com)**

### **Steps for Render.com:**
1.  Push your code to GitHub (You already did this ✅).
2.  Sign up at [render.com](https://render.com).
3.  Click **"New +"** -> **"Web Service"**.
4.  Connect your GitHub repository (`quiz-`).
5.  **Settings**:
    - **Runtime**: Node
    - **Build Command**: `npm install`
    - **Start Command**: `node exam_backend_node/server.js`
6.  Click **Create Web Service**.
7.  Verify `Environment Variables` if you have any secret keys or DB paths.

> **Note**: Since you are using SQLite (`exam_system.db`), the database might reset if the free server restarts. For production, use a persistent database like PostgreSQL (also available on Render).
> **ملاحظة**: بما أنك تستخدم SQLite، قد يتم إعادة تعيين قاعدة البيانات عند إعادة تشغيل الخادم المجاني. للإنتاج الحقيقي، يُفضل استخدام PostgreSQL.

---

## Option 2: GitHub Pages (UI Only - Broken Logic)
### (الواجهة فقط - بدون تشغيل منطقي)

You can host *only* the frontend on GitHub Pages, but **Login and Exams will NOT work** because they need the backend server.
يمكنك رفع الواجهة فقط، لكن **لن يعمل تسجيل الدخول أو الامتحانات** لأنها تحتاج للخادم.

1.  Go to your repository settings on GitHub.
2.  Go to **Pages**.
3.  Under "**Build and deployment**", select **Source**: `Deploy from a branch`.
4.  Select Branch: `main`, Folder: `/frontend` (if possible, or move root files). *Note: GitHub Pages usually expects index.html at root or /docs.*
5.  Save.

**⚠️ Warning**: Visitors will see the login page, but clicking "Login" will show errors.
**⚠️ تحذير**: سيرى الزوار صفحة الدخول، ولكن عند المحاولة ستظهر أخطاء.
