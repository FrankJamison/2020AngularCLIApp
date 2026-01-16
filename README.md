# ClassApp (Angular)

Single-page Angular application built with Angular.

## Course context

This project was created as part of the Regis University **MSSE-663 Web Frameworks** course.

## Tech stack

- Angular 21 + TypeScript 5.9
- RxJS 7
- SCSS styling
- Unit tests: Jasmine + Karma (ChromeHeadless for CI)
- E2E tests: Playwright

## How the app works

- Module bootstrapping: `AppModule` imports `BrowserModule` and bootstraps `AppComponent`.
- Root component: `AppComponent` exposes a `title` string used in the template.
- Template behavior (starter UI): the home page is the Angular CLI starter template.
	- Interpolation: renders `{{ title }}` into the hero text.
	- Event handling: clicking “Next Steps” cards updates a hidden input’s value.
	- Conditional rendering: a `ngSwitch` block shows the corresponding CLI command snippet based on the selected card.

This app is currently a single-module / single-component UI (no router, no feature modules, no backend integration).

## Running the app

- Start dev server (custom host): `npm start`
- Start dev server (localhost): `npm run start:local`

When running locally, the app is served on `http://localhost:4200/`.

## Build

- Production build: `npm run build`

## Deploy to Apache (Hostinger VPS)

This is a static Angular SPA. For Apache deployment, you should **not** run `npm install` or `ng serve` on the VPS.

- Build locally (or in CI): `npm ci` then `npm run build:prod`
- Upload only the build output from `dist/2020AngularCLIApp/` into your Apache site root (e.g. `public_html/` or the configured `DocumentRoot`).

### SPA routing (deep links)

Client-side routes (e.g. `/some/path`) require rewrite-to-`index.html`.

This repo includes `src/.htaccess` and the Angular build copies it into the `dist/` output automatically. Ensure:

- Apache has `mod_rewrite` enabled
- Your vhost/directory config allows overrides: `AllowOverride All` (or at least `AllowOverride FileInfo`)

## Testing

### Unit tests (Karma + Jasmine)

- Watch mode (interactive): `npm run test:unit` (same as `npm test`)
- Single run (CI/headless): `npm run test:unit:ci`

What’s covered:
- `AppComponent` creation
- `title` value
- Rendered “app is running!” text

### E2E tests (Playwright)

- Run E2E: `npm run test:e2e` (same as `npm run e2e`)

How it works:
- Playwright uses `http://localhost:4200` as its base URL.
- The Playwright config automatically starts the dev server for the test run (or reuses an existing server).

What’s covered:
- Smoke test that loads `/` and asserts the page title.

### Run everything

- Unit (headless) + E2E: `npm run test:all`

## Further help

Angular CLI help: `npx ng help` or see the [Angular CLI README](https://github.com/angular/angular-cli).
