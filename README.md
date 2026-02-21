# Angular CLI Application

Developer-focused Angular single-page application (SPA) built with Angular CLI.

**Live preview:** https://angularcli.fcjamison.com/

## Tech stack

- Angular 21 + TypeScript 5.9
- RxJS 7
- Styling: SCSS
- Unit tests: Jasmine + Karma
- E2E tests: Playwright

## Prerequisites

- Node.js + npm (use whatever version your Angular CLI install supports)
- Windows (this repo is often developed on Windows with XAMPP Apache)

## Install

```bash
npm ci
```

## Run locally (choose one)

### Option A (recommended): custom hostname on port 80 via Apache + watch build

This is the closest match to production hosting: Apache serves static files, and Angular rebuilds into `dist/` as you edit.

1. Ensure your local web server serves `dist/2020AngularCLIApp/` for the hostname.

For XAMPP Apache, you want a vhost like:

```apache
<VirtualHost *:80>
  ServerName angularcliapplication.localhost
  DocumentRoot "D:/Websites/029-2020-Angular-CLI-Application/dist/2020AngularCLIApp"

  <Directory "D:/Websites/029-2020-Angular-CLI-Application/dist/2020AngularCLIApp">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
```

2. Make sure Windows resolves the hostname:

- File: `C:\Windows\System32\drivers\etc\hosts`
- Entry: `127.0.0.1 angularcliapplication.localhost`

3. Start a dev watch build:

```bash
npm start
```

4. Open:

- `http://angularcliapplication.localhost/`

### Option B: Angular dev server on custom hostname (port 4200)

This uses `ng serve`, but keeps the custom hostname. Use this if you want HMR/dev-server behavior.

```bash
npm run serve:apphost
```

Open:

- `http://angularcliapplication.localhost:4200/`

### Option C: Angular dev server on localhost (port 4200)

```bash
npm run start:local
```

Open:

- `http://localhost:4200/`

## VS Code tasks

Tasks are defined in `.vscode/tasks.json`.

- **Serve apphost + Open (4200)**: starts `npm run serve:apphost` and opens `http://angularcliapplication.localhost:4200/`.
- **Open in Browser**: opens `http://angularcliapplication.localhost/` (Apache-served build output).

## Scripts

Common commands (see `package.json`):

- `npm start` — `ng build --watch` (writes to `dist/2020AngularCLIApp/`)
- `npm run build` — dev build
- `npm run build:prod` — production build
- `npm run start:local` — `ng serve` on localhost
- `npm run serve:apphost` — `ng serve` on `angularcliapplication.localhost:4200`

## Testing

### Unit tests (Karma + Jasmine)

```bash
npm test
```

Headless/CI:

```bash
npm run test:unit:ci
```

### E2E tests (Playwright)

```bash
npm run test:e2e
```

Playwright is configured to start/reuse `npm run start:local` and uses base URL `http://localhost:4200`.

## Build and deploy

This is a static Angular SPA. Deploy by uploading the contents of:

- `dist/2020AngularCLIApp/`

Production build command:

```bash
npm ci
npm run build:prod
```

### SPA routing (deep links)

Deep links must rewrite to `index.html`.

- Apache: `src/.htaccess` is copied into `dist/` during builds (requires `mod_rewrite` + `AllowOverride All`)
- IIS: `src/web.config` is copied into `dist/` (requires IIS URL Rewrite)

## Notes

- Browser tab title is set in `src/index.html`.
- In-page title text comes from `src/app/app.component.ts` and is displayed in `src/app/app.component.html`.
