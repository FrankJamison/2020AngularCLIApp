# Angular CLI Application (2020)

Developer-focused Angular single-page application (SPA) built with Angular CLI.

- Live preview: https://angularcli.fcjamison.com/

## Tech stack

- Angular 21 + TypeScript 5.9
- RxJS 7
- Styling: SCSS
- Unit tests: Jasmine + Karma
- E2E tests: Playwright

## Prerequisites

- Node.js + npm (use a Node version compatible with the Angular CLI version in this repo)
- Optional (for Option A): a web server that can serve static files + SPA rewrites (Apache or IIS)
- For tests: Chrome/Chromium (Karma uses Chrome; Playwright can install its own browser binaries)

## Quickstart (most developers)

1. Install dependencies:

```bash
npm ci
```

2. Start the Angular dev server on localhost:

```bash
npm run start:local
```

3. Open:

- http://localhost:4200/

## Local development options

This repo supports two main workflows:

### Option A (recommended for production-like hosting): Apache/IIS serves `dist/` + watch build

Use this when you want to mimic how the app is deployed (static files + SPA rewrite rules).

- `npm start` runs `ng build --watch` and writes build output to `dist/2020AngularCLIApp/` (see `angular.json` `outputPath`).
- Your web server should serve the `dist/2020AngularCLIApp/` folder.

#### Example: Apache vhost on Windows (XAMPP)

1. Add a hosts entry so Windows resolves the custom hostname:

- File: `C:\Windows\System32\drivers\etc\hosts`
- Entry:

```text
127.0.0.1 angularcliapplication.localhost
```

2. Configure a vhost that points at the build output:

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

3. Start the watch build:

```bash
npm start
```

4. Open:

- http://angularcliapplication.localhost/

#### SPA routing (deep links)

When serving the built app, deep links must rewrite to `index.html`.

- Apache: `src/.htaccess` is copied into `dist/` during builds (requires `mod_rewrite` + `AllowOverride All`).
- IIS: `src/web.config` is copied into `dist/` during builds (requires IIS URL Rewrite).

### Option B: Angular dev server on a custom hostname (port 4200)

Use this when you want dev-server behavior (fast refresh, dev-server errors) but still need a non-`localhost` hostname.

1. Ensure Windows resolves the hostname (same as Option A):

```text
127.0.0.1 angularcliapplication.localhost
```

2. Start the dev server:

```bash
npm run serve:apphost
```

3. Open:

- http://angularcliapplication.localhost:4200/

`serve:apphost` explicitly sets `--allowed-hosts angularcliapplication.localhost` to avoid Angular dev-server host checks.

## VS Code tasks

Tasks are defined in `.vscode/tasks.json`.

- **Serve: apphost (4200)**: runs `npm run serve:apphost`.
- **Serve apphost + Open (4200)**: runs `npm run serve:apphost` and opens http://angularcliapplication.localhost:4200/.
- **Open in Browser**: opens http://angularcliapplication.localhost/ (useful for Apache-served `dist/`).

## Scripts

All scripts live in `package.json`.

| Command                 | What it does                                                |
| ----------------------- | ----------------------------------------------------------- |
| `npm start`             | `ng build --watch` (writes into `dist/2020AngularCLIApp/`)  |
| `npm run build`         | one-time dev build                                          |
| `npm run build:prod`    | production build (`--configuration production`)             |
| `npm run start:local`   | `ng serve` on `http://localhost:4200`                       |
| `npm run serve:apphost` | `ng serve` on `http://angularcliapplication.localhost:4200` |
| `npm test`              | unit tests (Karma + Jasmine)                                |
| `npm run test:unit:ci`  | headless unit tests (ChromeHeadless, no watch)              |
| `npm run test:e2e`      | Playwright tests (uses config in `playwright.config.ts`)    |
| `npm run test:all`      | unit (CI) + e2e                                             |
| `npm run lint`          | Angular lint                                                |

Additional scripts:

- `npm run build:watch` — alias for `ng build --watch`
- `npm run test:unit` — alias for `ng test`
- `npm run e2e` — alias for `npm run test:e2e`
- `npm run start:2020host` — `ng serve` on `http://2020angularcliapp.localhost:4200` (requires a matching `hosts` entry)

## Testing

### Unit tests (Karma + Jasmine)

```bash
npm test
```

CI/headless:

```bash
npm run test:unit:ci
```

### E2E tests (Playwright)

```bash
npm run test:e2e
```

Notes:

- Playwright is configured to start/reuse `npm run start:local` at `http://localhost:4200` (see `playwright.config.ts`).
- First-time setup may require installing browser binaries:

```bash
npx playwright install
```

## Configuration notes

### Environments

- Dev: `src/environments/environment.ts`
- Prod: `src/environments/environment.prod.ts` (used by `npm run build:prod` via Angular file replacements)

### Build output

The build output folder is:

- `dist/2020AngularCLIApp/`

That path is controlled by `angular.json` (`projects.2020AngularCLIApp.architect.build.options.outputPath`).

## Project structure (high level)

- `src/` – app source
- `src/app/` – Angular module + root component
- `src/assets/` – static assets
- `e2e/` – Playwright tests

## Build & deploy

This is a static Angular SPA. For production builds:

```bash
npm ci
npm run build:prod
```

Deploy the contents of:

- `dist/2020AngularCLIApp/`

## Troubleshooting

- **Custom hostname doesn’t resolve**: ensure the Windows `hosts` entry exists for `angularcliapplication.localhost`.
- **Dev server rejects the hostname**: use `npm run serve:apphost` (includes `--allowed-hosts angularcliapplication.localhost`).
- **Port 80 already in use** (Option A): stop the service using port 80 or change your vhost/port.
- **Deep links 404 on refresh**: verify your server is applying the SPA rewrite rules (`src/.htaccess` for Apache or `src/web.config` for IIS).
- **Playwright fails with missing browsers**: run `npx playwright install`.

## Notes

- Browser tab title is set in `src/index.html`.
- In-page title text comes from `src/app/app.component.ts` and is rendered by `src/app/app.component.html`.
