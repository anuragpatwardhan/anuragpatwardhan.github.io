# Anurag Patwardhan — Portfolio

Next.js 16 + Tailwind v4. Static export → GitHub Pages. Contact form delivered to your inbox via Web3Forms (no backend).

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

All copy lives in `src/data/site.ts` — name, email, projects, skills, experience, testimonials, awards. Edit there, no component changes needed. Case studies live in `src/data/projectDetails.ts` and posts in `src/data/blogs.ts`.

## Tests

```bash
npm test
```

30 cases. A static content site does not fail loudly — a slug listed on an index page with
no detail entry behind it is a dead link, and a mistyped image path is an empty box. Both
survive `next build`, so the tests check the things the build does not:

- **Content integrity** — slugs unique and URL-safe, every project card with a link having
  a case study behind it, card and case-study names agreeing (they are separate data and
  can drift), every local image resolving to a real file under `public/`, nav entries
  pointing at routes that exist, and internally hosted posts carrying a body while
  external ones carry an absolute URL.
- **Next / previous navigation** — that following "read next" from any starting point
  reaches *every* post rather than cycling between two of them. This is what the blog page
  was getting wrong: it offered the first other post, which is indistinguishable from
  correct on two posts and stranded the third.

## Swap in your real images

Placeholders are colored blocks labeled `*.jpg` / `*.png`. To replace, drop files into `public/images/` and update the relevant component to use `<Image src="/images/your-file.jpg" ... />`. Files you'll likely want:

- `public/images/portrait.jpg` — hero portrait (used in `Intro.tsx`)
- `public/images/projects/syncspace.png` etc. — project tiles (used in `Highlights.tsx`, `Projects.tsx`)
- `public/images/avatar.png` — small "Anurag Patwardhan" avatar in the About card

Resume PDF is already in place at `public/resume.pdf` (your SWE_AI variant).
