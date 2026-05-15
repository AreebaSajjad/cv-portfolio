# 🌟 Areeba Sajjad — Portfolio Website

![Projects Section](https://github.com/AreebaSajjad/FA23-BCS-033/blob/main/CV-portfolio/Screenshot%202026-03-11%20135303.png?raw=true)

A modern, glassmorphism-themed React portfolio website with Supabase backend and Admin Panel.

## ✨ Features
- 🎨 **Glassmorphism Design** — Animated background, glass cards, gradient text
- ⚛️ **React + React Router** — Multi-page: Home, Projects, Admin
- 🗄️ **Supabase Ready** — Backend for projects, skills, messages
- 🛡️ **Admin Panel** — Manage projects, skills, view messages (password protected)
- 📄 **CV Download** — One-click download button
- 📱 **Fully Responsive** — Mobile-first design
- ✍️ **Typewriter Effect** — Animated role titles in Hero
- 🌊 **7 Sections** — Hero, About, Skills, Projects, Education, Contact

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase (Optional but recommended)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor and run the SQL from `src/lib/supabase.js`
4. Copy your Project URL and anon key
5. Edit `src/lib/supabase.js`:
   ```js
   export const SUPABASE_URL = 'https://yourproject.supabase.co';
   export const SUPABASE_ANON_KEY = 'your-anon-key';
   ```

### 3. Add Your CV PDF
Place your CV file at: `public/Areeba_Sajjad_CV.pdf`

### 4. Personalize
Edit `src/lib/data.js` to update:
- Your name, email, phone, location
- Education details
- Projects and Skills

### 5. Change Admin Password
In `src/pages/AdminPanel.js`, line 7:
```js
const ADMIN_PASSWORD = 'your-new-password';
```

### 6. Run Development Server
```bash
npm start
```

### 7. Build for Production
```bash
npm run build
```

## 📁 Project Structure
```
src/
├── components/
│   ├── Navbar.js / .css
│   ├── Hero.js / .css
│   ├── Sections.js / .css     ← About, Skills, Experience, Education, Contact
│   └── Footer.js / .css
├── pages/
│   ├── Home.js
│   ├── Projects.js / .css
│   └── AdminPanel.js / .css
├── lib/
│   ├── supabase.js            ← Supabase config + SQL
│   └── data.js                ← Mock data + personal info
├── App.js / .css              ← Routes + Global styles
└── index.js
```

## 🛠️ Tech Stack Used
| Category | Technologies |
|----------|-------------|
| Frontend | React 18, React Router v6 |
| Styling | Custom CSS, Google Fonts (Playfair Display, DM Sans, Space Mono) |
| Backend | Supabase (PostgreSQL) |
| Icons | Lucide React |
| Deployment | Vercel / Netlify (recommended) |

## 🌐 Deploy to Vercel
```bash
npm i -g vercel
vercel
```

## 📝 Admin Panel
- URL: `/admin`
- Default Password: `areeba2024`
- Features: Add/delete projects, add/delete skills, view messages

---
Made with 💜 for Areeba Sajjad's portfolio
