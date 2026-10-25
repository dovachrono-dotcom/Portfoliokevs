# Kevin C. Mercado — Portfolio

Personal portfolio built with Next.js, React, TypeScript and Tailwind CSS. It includes Home, About, Projects, Contact and Blog pages, light/dark themes, photos/videos and a downloadable CV.

Live website: [portfoliokevs.vercel.app](https://portfoliokevs.vercel.app). Source: [dovachrono-dotcom/Portfoliokevs](https://github.com/dovachrono-dotcom/Portfoliokevs).

## Open in VS Code

Open **`ITelecnaha`**, the folder containing `package.json`, `app`, `components`, `lib` and this README. Open this inner project rather than its parent `Portfolio enhance`, which has a separate Git repository.

```powershell
cd "C:\Users\Hp\Documents\ChatGPT\Portfolio enhance\ITelecnaha"
code .
```

Or use **File → Open Folder** in VS Code.

The main folders follow the same pattern as HerbalAI's frontend. This portfolio is one Next.js app; it does not need HerbalAI's separate backend. Blogs use local data, and the contact form opens an email draft.

## File structure

```text
ITelecnaha/
├── app/                      Routes, page files and global styles
│   ├── page.tsx              Home
│   ├── about/                About page
│   ├── projects/             Projects page
│   ├── contact/              Contact page
│   ├── blog/                 Blog list, [slug] articles and archives
│   ├── layout.tsx            Shared page shell
│   └── globals.css           Theme colors and global styles
├── components/
│   ├── common/               Header, footer, portraits, background and shared motion
│   ├── features/             Page sections grouped by feature
│   │   ├── home/
│   │   ├── about/
│   │   ├── projects/
│   │   ├── contact/
│   │   └── blog/
│   ├── provider/             Theme and motion providers
│   └── ui/                   Reusable UI components
├── lib/                      Content, types and shared helpers
│   ├── portfolio.ts          Project list, navigation and social links
│   ├── blog.ts               Posts, categories and media information
│   ├── profile.json          Personal details, education, work and skills
│   └── data.ts               About data, including certificates
├── public/                   Assets served by the website
│   ├── projects/             Project screenshots
│   ├── blog/                 Blog covers, photos and videos
│   ├── portraits/            Light/dark portraits
│   ├── contact/              Transparent pointer figures
│   └── Kevin_Mercado_CV.pdf   Downloadable CV
├── source/                   Original pointer photos
├── scripts/                  CV and image-preparation scripts
├── docs/                     Detailed maintenance and asset notes
├── .vscode/settings.json     Cleaner VS Code Explorer view
├── DESIGN.md                 Design notes
├── PRODUCT.md                Project purpose and content rules
├── package.json              Dependencies and commands
└── README.md                 This guide
```

Keep routes in `app`, page sections in `components/features`, shared components in `components/common`, content in `lib`, and website assets in `public`.

VS Code hides build/cache folders, review artifacts, generated exports and design-tool metadata. The files remain on disk. Change `.vscode/settings.json` if you want to show them. Original photos in `source` stay visible; the website uses assets from `public`.

## Run locally

Use Node.js **20.9 or newer**, npm and Git. Open a terminal in the project root.

```powershell
npm ci
npm run build
npm run preview
```

Run `npm ci` when setting up a fresh clone. Open [http://127.0.0.1:4317](http://127.0.0.1:4317). You can also double-click `Start Portfolio.cmd`, which builds once before starting this production preview. Pages are ready before you navigate, so the first click does not wait for development compilation. Stop the server with **Ctrl+C** in its terminal.

For live editing with automatic reloads, run `npm run dev -- --webpack --hostname 127.0.0.1 --port 4317` instead. Development mode compiles a route on its first visit and can take longer. Stop the other server before reusing the same port. After editing, rebuild before reviewing with `npm run preview`.

Plain `npm run dev` normally starts at [http://localhost:3000](http://localhost:3000); use the address printed by that server. If PowerShell blocks `npm.ps1`, use `npm.cmd` instead of `npm`.

## Where to edit

| Change | File or folder |
| --- | --- |
| Projects | `lib/portfolio.ts` |
| Blog posts and categories | `lib/blog.ts` |
| Personal details, contact, education, work and skills | `lib/profile.json` |
| Certificates | `lib/data.ts` |
| Navigation and social links | `lib/portfolio.ts` |
| Home's three project cards | `components/features/home/ProjectFan.tsx` |
| Project folders | `components/features/projects/ProjectsList.tsx` |
| Blog cards and article layout | `components/features/blog/` |
| Theme colors | `app/globals.css` |
| Header/footer | `components/common/Header.tsx`, `components/common/Footer.tsx` |
| Downloadable CV | `public/Kevin_Mercado_CV.pdf`; see `docs/cv-maintenance.md` |

## Add a project

1. Save a real screenshot in `public/projects/`, such as `my-new-project.webp`. Use lowercase, hyphenated filenames. A wide screenshot around 16:9 works well.
2. Open `lib/portfolio.ts`. Add an entry inside `FEATURED_PROJECTS`, before its closing `];`. Append it after existing projects to preserve the current Home selections and capability links.
3. The current type requires a `stage` key. Add your new key to the existing `FeaturedProject.stage` union, retaining all current values:

```ts
stage: "herbalStage" | "pormaStage" | "digicamStage" | "fcfsStage" | "newProjectStage";
```

4. Add this complete entry to `FEATURED_PROJECTS` and replace the sample values:

```ts
{
  id: "my-new-project",
  title: "My New Project",
  category: "Side project · Web application",
  description: "Side project: A short explanation of what I built and why.",
  summary: "A short description of what the project helps people do.",
  tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  image: "/projects/my-new-project.webp",
  imageAlt: "The project homepage showing its main interface.",
  url: "https://example.com/",
  host: "example.com",
  stage: "newProjectStage",
},
```

5. Use a unique `id` and the real project URL. `stage` is a required compatibility field in the current type; it does not select a different screenshot layout.
6. Check `/projects` locally: folder, screenshot, description, technologies and live link. The folder count comes from the array automatically.

Image URLs start with `/projects/`, **not** `/public/projects/`.

**Home displays only the first three entries** through `FEATURED_PROJECTS.slice(0, 3)`. To feature a new project, move it into the first three. If you reorder them, also update the matching descriptions/links in `components/features/home/Capabilities.tsx`, which currently uses array positions `0`, `1` and `2`. Keep the existing `herbalai` ID because About's skills section looks it up by ID.

## Add a blog post

1. Save the cover in `public/blog/`, such as `another-capstone-memory.webp`.
2. Open `lib/blog.ts` and insert the following entry inside `BLOG_POSTS`. Put it first to show it first; the list follows array order rather than sorting dates.

```ts
{
  slug: "another-capstone-memory",
  title: "Another capstone memory",
  excerpt: "A short introduction that makes someone want to read the story.",
  category: "student-life",
  publishedAt: "2026-10-25",
  cover: {
    src: "/blog/another-capstone-memory.webp",
    alt: "Describe what is visible in the cover image.",
    position: "center",
  },
  sections: [
    {
      paragraphs: [
        "Write the opening paragraph here in your own words.",
      ],
    },
    {
      heading: "What I remember",
      paragraphs: [
        "Write the next part of the story here.",
        "Add another paragraph if needed.",
      ],
    },
  ],
},
```

3. Set the actual publication date as `YYYY-MM-DD`. Use a unique lowercase, hyphenated slug without spaces or `/` characters.
4. Choose `capstone` or `student-life`. For a new category, add its `id` and readable `label` to `BLOG_CATEGORIES` in the same file, then use that ID.
5. Visit `/blog` and `/blog/another-capstone-memory`. Check the cover, article and category filter.

No new page file is needed: `app/blog/[slug]/page.tsx` creates each article from its slug. Reading time, metadata, related links and archives use the same data.

### Optional photo inside an article

The cover appears in the blog list. To also show a full photo inside the article, add this property to the same post object, alongside `cover` and `sections`:

```ts
photo: {
  src: "/blog/another-capstone-memory.webp",
  alt: "Describe the people, place or activity shown in the photo.",
  width: 1448,
  height: 1086,
  caption: "A short caption about this memory.",
},
```

Use the image's real dimensions. Article photos retain their full proportions; covers crop to fit their cards. Adjust `cover.position`, such as `"50% 40%"`, if the subject is cropped badly.

### Optional video inside an article

Save the clip and poster in `public/blog/`, then add this property to the post:

```ts
video: {
  src: "/blog/my-memory.mp4",
  poster: "/blog/my-memory-cover.webp",
  width: 720,
  height: 1280,
  label: "A short video from our capstone nights",
  caption: "A night spent working and laughing with friends.",
},
```

Use the real video dimensions. The current clip uses H.264 video and AAC audio in an MP4. The player has controls and no autoplay; its current size suits portrait clips. The poster can also be `cover.src`. Keep clips reasonably small because they are stored in the repository.

With FFmpeg installed, extract a poster at six seconds:

```powershell
ffmpeg -ss 00:00:06 -i "public/blog/my-memory.mp4" -frames:v 1 -c:v libwebp -quality 88 "public/blog/my-memory-cover.webp"
```

## Check your work

Run from the project root:

```powershell
npm run lint -- app components lib
npm run typecheck
npm run build
```

The build also checks TypeScript and generates the blog routes. At this handoff, the app has no lint errors and one existing image-optimization warning in `app/not-found.tsx`.

Preview the changed pages at desktop and phone widths, in both themes. Check images, links, keyboard focus and video controls. Build checks cannot replace looking at the page.

## Git commands when done

### Review, commit and push your current branch

```powershell
git rev-parse --show-toplevel
git branch --show-current
git status
git diff
```

The Git root should end in `ITelecnaha`. Check the branch name and review any existing changes before creating another branch for future updates. Commit your completed work before switching branches.

After checking your changes and passing the checks:

```powershell
git add -A
git diff --cached --stat
git diff --cached
git commit -m "Add a new project and blog post"
git push -u origin HEAD
```

Use a message matching the actual change, such as `Add capstone defense story`. `git add -A` stages **all** unignored changes, including earlier work, so review the staged diff before committing. Build files, dependencies, `review` and generated `output` are ignored. Website assets in `public` should be committed.

`git push -u origin HEAD` pushes the current branch to GitHub and sets its upstream. It does not merge into `main`. The deployment repository is `https://github.com/dovachrono-dotcom/Portfoliokevs.git`; the earlier repository can remain available as a separate `original` remote.

### Start a branch for a later update

Once your working tree is clean, create a branch from your current checkout:

```powershell
git switch -c codex/add-new-blog
```

This includes the current branch's commits. If the redesign has already been merged into `main`, start from updated main instead:

```powershell
git switch main
git pull --ff-only origin main
git switch -c codex/add-new-blog
```

Use a fresh branch name for each update. Then edit, check, commit and push as above.

### Update the live website

Open a pull request from your pushed branch into `main`, review it, and merge when ready. Check Vercel's production-branch setting: production updates from the branch that project is configured to deploy. A feature-branch push may create a preview deployment rather than update the live site.

This project's Vercel account is `dovachrono-1203`, project `portfoliokevs`, linked to this GitHub repository. `vercel.json` explicitly selects Next.js. See [deployment notes](docs/deployment.md) for the live URL and the manual deployment fallback.

This guide does not run any push, merge or deployment for you.

## Further notes

- [Performance cleanup and measurements](docs/performance.md)
- [Blog content and media](docs/blog-content.md)
- [CV and profile updates](docs/cv-maintenance.md)
- [Photo and screenshot sources](docs/asset-sources.md)
- [Project folders](docs/project-preview.md)
- [Shared grid background](docs/site-background.md)
- [KEVIN footer](docs/kevin-footer.md)
- [Local preview](docs/local-preview.md)
