# SEBI Grade A IT Study Hub

A responsive, offline-capable preparation website for GitHub Pages. Includes a 180-day / 26-week roadmap at four hours per day, linked topic notes, daily and weekly progress, original questions with explanations, revision cards, mock logs, current-affairs notes, a focus timer, analytics and a PDF/DOCX reader.

## Start locally

Requires Node.js 22 or newer.

```sh
npm ci
npm test
npm run build
npm start
```

Open http://127.0.0.1:4173/SEBIPAPER/. The preview exercises project-path hosting, as used by GitHub Pages. Source is plain HTML/CSS/JavaScript; the build copies pinned reader libraries into the site so no CDN is needed at runtime.

## Publishing

Push this project to a GitHub repository's `main` branch. In Settings → Pages select GitHub Actions. The included workflow tests, builds, uploads and deploys `dist`. Hash routes and relative paths work under a repository subdirectory. Do not publish private files or progress backups in the repository.

The optional `tools/github.cjs` helper reads an existing Git Credential Manager credential in memory, validates the account and can create `SEBIPAPER` and configure Pages. It never writes tokens into source or remote URLs. Run `node tools/github.cjs status` first. Expired credentials require signing in again; do not put a token into chat or a committed file.

## Study content

The baseline is the [official 2025 recruitment advertisement](https://www.sebi.gov.in/sebi_data/careerfiles/oct-2025/1761782417659.pdf), checked on 12 September 2026. That recruitment's exams occurred in January/February 2026. No future recruitment date is assumed. Confirm newer notices on SEBI's vacancies page. Core versus supplementary material is labelled. The question bank contains original teaching questions, not past papers or a complete full-length mock series. Detailed policy notes may age; use dated primary documents for current requirements.

Included books retain their own licences and are unmodified: Pat Morin's Open Data Structures (CC Attribution), Allen B. Downey's Think Python 2e (CC BY-NC 3.0), and Jeff Erickson's Algorithms (CC BY 4.0). Source links and attribution are displayed in the reader. This is a noncommercial study project. See `library/ATTRIBUTION.md`.

The daily plan and source notes are committed. `tools/complete-content.cjs`, `tools/generate-plan.cjs` and `tools/generate-questions.cjs` generate their corresponding content. They are authoring tools; normal builds do not regenerate or unexpectedly change the plan. `tools/fix-app.cjs` records the one-time migration from the unfinished project and must not be rerun. The older `tools/build-roadmap.js` is superseded by `tools/generate-plan.cjs`.

## Progress, privacy and offline use

Progress and notes live in localStorage. Imported device books up to 30 MB are saved in IndexedDB. Nothing automatically syncs between devices. Export a JSON backup in Settings and import it on the other device; imports replace that device's progress. Backups do not contain locally opened books. Transfer those separately. Browser storage can be cleared or evicted, so keep backups.

The service worker precaches the app, all notes, practice data and reader dependencies. Settings reports readiness. PDFs are cached after opening them online. External source websites require a connection. The reader supports PDF, DOCX, TXT and Markdown; legacy binary DOC needs conversion. The focus timer logs complete active minutes, excludes five-minute breaks, and handles background-tab throttling.

## Verification

`npm test` checks all 180 daily schedules, every lesson reference, question integrity, book signatures, exam weights, module syntax, route rendering, task persistence, backup validation, Markdown sanitisation and practice navigation. Browser checks should additionally exercise PDF page navigation, bookmarking, Word conversion and offline reloads on a real browser.
