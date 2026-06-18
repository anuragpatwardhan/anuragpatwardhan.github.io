# Anurag Patwardhan — Portfolio

Next.js 15 + Tailwind v4. Static export → GitHub Pages. Contact form delivered to your inbox via Web3Forms (no backend).

## Run locally

```bash
npm install
cp .env.local.example .env.local   # then paste your Web3Forms key
npm run dev
```

Open http://localhost:3000.

## Contact form setup

1. Go to https://web3forms.com → enter `patwardhan.an@northeastern.edu` → confirm email → copy the access key.
2. Paste it into `.env.local` as `NEXT_PUBLIC_WEB3FORMS_KEY=...`.
3. Submissions arrive at the email above.

## Deploy to GitHub Pages

1. Create a public repo named **`anuragg0720.github.io`** under your account.
2. In the repo settings → **Secrets and variables → Actions → New repository secret**, add:
   - Name: `NEXT_PUBLIC_WEB3FORMS_KEY`
   - Value: your Web3Forms access key
3. Settings → **Pages → Build and deployment → Source: GitHub Actions**.
4. Push:

   ```bash
   git init
   git add .
   git commit -m "initial portfolio"
   git branch -M main
   git remote add origin https://github.com/anuragg0720/anuragg0720.github.io.git
   git push -u origin main
   ```

The Actions workflow at `.github/workflows/deploy.yml` builds and publishes on every push to `main`. Site goes live at https://anuragg0720.github.io.

## Editing content

All copy lives in `src/data/site.ts` — name, email, projects, skills, experience, testimonials, awards. Edit there, no component changes needed.

## Swap in your real images

Placeholders are colored blocks labeled `*.jpg` / `*.png`. To replace, drop files into `public/images/` and update the relevant component to use `<Image src="/images/your-file.jpg" ... />`. Files you'll likely want:

- `public/images/portrait.jpg` — hero portrait (used in `Intro.tsx`)
- `public/images/projects/syncspace.png` etc. — project tiles (used in `Highlights.tsx`, `Projects.tsx`)
- `public/images/avatar.png` — small "Anurag Patwardhan" avatar in the About card

Resume PDF is already in place at `public/resume.pdf` (your SWE_AI variant).
