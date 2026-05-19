# yasas.io — Landing Page

React + Vite + Tailwind CSS landing page for yasas.io.

## Stack

- React 18
- Vite 5
- Tailwind CSS 3
- Framer Motion 11
- lucide-react

---

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173
```

---

## Production build

```bash
npm run build
```

Generates a `dist/` folder with static files ready to deploy.

To preview the build locally before deploying:

```bash
npm run preview
# → http://localhost:4173
```

---

## Deploy to Hostinger

1. Run `npm run build`
2. Open your Hostinger File Manager (hPanel → File Manager)
3. Navigate to `public_html/`
4. Delete existing files if replacing an existing site
5. Upload **all contents** of the `dist/` folder into `public_html/`
   - Upload `index.html` directly into `public_html/`
   - Upload the `assets/` folder into `public_html/assets/`
6. Done — visit your domain to verify

> **Note:** Do NOT upload the `dist/` folder itself — upload what's *inside* it.

---

## Push to GitHub

```bash
# First time setup
git init
git add .
git commit -m "feat: initial yasas.io landing page"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/yasas-io.git
git branch -M main
git push -u origin main

# Future updates
git add .
git commit -m "your message"
git push
```

---

## Project structure

```
yasas-io/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx        ← all components + copy
│   ├── main.jsx       ← React entry point
│   └── index.css      ← Tailwind + global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

---

## Customization

- **Copy / translations:** Edit the `copy` object at the top of `src/App.jsx`
- **Colors:** Search for hex values like `#FF5A4D`, `#7B5CFF`, `#FFB020`
- **Pricing:** Update `plans` arrays in `copy.en.plans` and `copy.es.plans`
- **Email contact:** Replace `hello@yasas.io` in the booking section CTA
