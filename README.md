# 2020AngularCLIApp (Angular)

An Angular single-page application built for a web frameworks course — with just enough polish to look serious, and just enough starter-template DNA to remain honest.

## 2026 updates (repo cleanup)

This repo was refreshed in 2026 to keep it easy to deploy and maintain:

- Deployment target is a static Apache site (upload build output only).
- Protractor was removed (deprecated in Angular); Playwright is used for E2E.
- Unit tests remain Jasmine + Karma.

## Course context

Created as part of the Regis University **MSSE-663 Web Frameworks** course.

## Tech stack

- Angular 21 + TypeScript 5.9
- RxJS 7
- Styling: SCSS (global + component styles)
- Unit tests: Jasmine + Karma (ChromeHeadless for CI)
- E2E tests: Playwright

## Quick start

```bash
npm ci
npm run start:local
```

- App URL: `http://localhost:4200/`
- Production build: `npm run build:prod`

## Design & behavior

This app intentionally stays “small and legible”:

- One Angular module (`AppModule`) bootstraps one root component (`AppComponent`).
- No router, no feature modules, no backend integration (yet).
- The UI is based on the Angular CLI starter template.

### UI/data flow

- The root component exposes `title` (see `src/app/app.component.ts`).
- The template interpolates `{{ title }}` into the hero area (see `src/app/app.component.html`).
- The browser tab title is configured in `src/index.html` (`<title>…</title>`). This is intentionally separate from the in-page `title` property.

### Styling

- Global styles live in `src/styles.scss`.
- Component styles live alongside components (example: `src/app/app.component.scss`).

## Project structure

Key folders/files:

- `src/` — application source
  - `main.ts` — Angular bootstrap entrypoint
  - `index.html` — HTML shell (document title, base href)
  - `environments/` — environment switching (via file replacements in production builds)
  - `.htaccess` — Apache rewrite rules for SPA routing (copied into `dist/` on build)
- `e2e/` — end-to-end tests
  - `app.e2e.spec.ts` — Playwright smoke test
- `angular.json` — Angular workspace config (build/serve/test targets)
- `playwright.config.ts` — Playwright config (auto-starts `npm run start:local`)
- `karma.conf.js` — Karma config for unit tests

## Scripts

Common commands (see `package.json`):

- Dev server (custom host): `npm start`
- Dev server (localhost): `npm run start:local`
- Build (default): `npm run build`
- Build (production): `npm run build:prod`
- Unit tests (watch): `npm test` or `npm run test:unit`
- Unit tests (headless/CI): `npm run test:unit:ci`
- E2E tests (Playwright): `npm run test:e2e` (same as `npm run e2e`)
- Unit + E2E: `npm run test:all`

## Testing

### Unit tests (Karma + Jasmine)

- Entry: `src/test.ts`
- Specs: `src/**/*.spec.ts`
- Run:
  - Interactive watch: `npm test`
  - CI/headless: `npm run test:unit:ci`
### E2E tests (Playwright)

- Config: `playwright.config.ts`
- Test location: `e2e/`

How it runs:

- Playwright starts (or reuses) the dev server via `npm run start:local`.
- Base URL is `http://localhost:4200`.
- Traces are captured on first retry (`trace: 'on-first-retry'`).

### Notes

Playwright is the supported E2E runner for this repo.

Protractor is intentionally not used. If you see the word `protractor` inside `package-lock.json`, that is coming from upstream Angular tooling as an *optional peer dependency declaration* (metadata), not because Protractor is installed or required.

Production builds use hashed filenames (`outputHashing: 'all'`), which plays nicely with aggressive caching on CDNs/Apache.

## Deploy to Apache (Hostinger VPS)

This is a static Angular SPA. Your Apache server should serve the files; it does **not** need Node.js or `npm install`.

Recommended deployment flow:

1) Build locally (or in CI):

```bash
npm ci
npm run build:prod
```

2) Upload the contents of `dist/2020AngularCLIApp/` to your Apache site root (e.g. `public_html/` or your configured `DocumentRoot`).

### SPA routing (deep links)

Client-side routes (example: `/some/path`) must rewrite to `index.html`.

This repo includes `src/.htaccess`, and `angular.json` copies it into `dist/` automatically during builds. Requirements:

- Apache module `mod_rewrite` enabled
- Directory/VHost allows overrides: `AllowOverride All` (or at least `AllowOverride FileInfo`)

## Local dev notes

## Preview `dist/` via Apache or IIS (local)

Sometimes you want to test the **real production build output** locally (what you would upload to a server).

1) Build the production output:

```bash
npm run build:prod
```

2) Point your web server site root at `dist/2020AngularCLIApp/`.

### Apache

Apache will use `.htaccess` in the site root. This repo includes `src/.htaccess` and the build copies it into `dist/`.

#### XAMPP (recommended: VirtualHost at site root)

This is the cleanest way to preview the production build because the app is served from `/` (no base-href changes needed), and Angular deep links work via the built `.htaccess`.

1) Build:

```bash
npm run build:prod
```

2) Add a VirtualHost in XAMPP:

- File: `C:\xampp\apache\conf\extra\httpd-vhosts.conf`
- Add (adjust the `DocumentRoot` path if your checkout lives elsewhere):

```apache
<VirtualHost *:80>
  ServerName 2020angularcliapp.localhost
  DocumentRoot "D:/Websites/2026FCJamison/projects/2020AngularCLIApp/dist/2020AngularCLIApp"

  <Directory "D:/Websites/2026FCJamison/projects/2020AngularCLIApp/dist/2020AngularCLIApp">
    Require all granted
    AllowOverride All
  </Directory>
</VirtualHost>
```

3) Ensure Apache loads vhosts + rewrite:

- In `C:\xampp\apache\conf\httpd.conf`, make sure these lines are enabled (not commented):
  - `LoadModule rewrite_module modules/mod_rewrite.so`
  - `Include conf/extra/httpd-vhosts.conf`

4) Add Windows hosts entry:

- File: `C:\Windows\System32\drivers\etc\hosts`
- Entry: `127.0.0.1 2020angularcliapp.localhost`

5) Restart Apache in XAMPP Control Panel.

6) Open `http://2020angularcliapp.localhost/` (or run the VS Code task “Open dist preview (Apache/IIS)”).

### IIS

IIS needs a `web.config` rewrite rule to support Angular client-side routes.

- This repo includes `src/web.config`, and the build copies it into `dist/`.
- IIS requires the **URL Rewrite** module installed/enabled for the rewrite rule to work.

### Custom hostname

`npm start` uses `--host 2020angularcliapp.localhost`. If you want that hostname to resolve on Windows, add this line to your hosts file:

- File: `C:\Windows\System32\drivers\etc\hosts`
- Entry: `127.0.0.1 2020angularcliapp.localhost`

If you don’t need the custom host, use `npm run start:local`.

## Further help

- Angular CLI help: `npx ng help`
- Angular CLI docs: https://github.com/angular/angular-cli
