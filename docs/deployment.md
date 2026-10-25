# Deployment

- Website: https://portfoliokevs.vercel.app
- GitHub: https://github.com/dovachrono-dotcom/Portfoliokevs
- Production branch: `main`
- Vercel scope: `dovachrono-1203`
- Vercel project: `portfoliokevs`

The repository is linked to Vercel. Updates to the production branch should create production deployments; review the deployment status in Vercel after pushing. Feature branches can have separate preview deployments.

The framework is explicitly set to `nextjs` in `vercel.json` and in the Vercel project settings. Using the Other preset would serve the `public` folder instead of the Next.js routes and produce a 404 at `/`.

For a manual deployment from the linked project folder, after checking the code:

```powershell
npx vercel login
npx vercel deploy --prod --scope dovachrono-1203
```

Use the intended Vercel account when signing in. Login credentials, `.env.local`, `.vercel` metadata, build output, review backups and original pointer source files are excluded from deployment uploads. Website images, video and the CV are served from `public`.

The local `origin` remote points to `dovachrono-dotcom/Portfoliokevs`. The earlier `ultrakevin143/ITelecnaha` repository is retained as the `original` remote. The old published website was not modified.

Initial production verification covered Home, About, Projects, Contact, Blog and both new article routes, each with the shared grid and one footer. The CV returned PDF content, and the coffee-story MP4 supported byte-range requests for playback/seeking.
