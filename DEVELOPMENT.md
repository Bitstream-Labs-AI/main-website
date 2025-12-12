# Development Guide

Technical documentation for developing the Bitstream Labs.AI website.

## Project Structure

```
├── src/
│   ├── assets/          # Static assets (CSS, images)
│   ├── components/      # Vue components
│   ├── views/           # Page views
│   ├── router/          # Vue Router configuration
│   └── test-utils/      # Testing utilities and factories
├── tests/
│   └── e2e/             # Playwright end-to-end tests
│       └── *-snapshots/ # Visual regression test snapshots
├── public/              # Static public files
├── .husky/              # Git hooks (pre-commit)
└── .work-items/         # Feature documentation and task tracking
```

## Scripts

All available scripts are defined in `package.json`. Run with `pnpm <script-name>`.

Common workflows:

- Development: `pnpm dev`
- Testing: `pnpm test:unit` and `pnpm test:e2e`
- Build: `pnpm build`
- Code quality: `pnpm lint` and `pnpm format`

For Playwright-specific options (debug mode, specific browsers/files, snapshot updates), see `package.json` or run `pnpm test:e2e --help`.

## Testing

### Unit Tests (Vitest)

Tests: `src/**/*.{test,spec}.{ts,tsx}`
Config: `vitest.config.ts`

**Features**:

- JSdom environment
- Vue Test Utils
- Test factories in `src/test-utils/factories.ts`
- Globals enabled

### End-to-End Tests (Playwright)

Tests: `tests/e2e/*.spec.ts`
Config: `playwright.config.ts`

**Viewports**:

- Desktop: 1920x1080 (Chromium, Firefox, WebKit)
- Tablet: 1024x1366 iPad Pro (Chromium, Firefox)
- Mobile: 390x844 iPhone 13 (Chromium, WebKit)

**Visual Regression**:

- Snapshots in `tests/e2e/**/*-snapshots/`
- Viewport-specific snapshots
- Tracked with Git LFS
- Threshold: 0.2 (20% pixel difference)

**Coverage**: Home page, contact form, navigation, footer, visual regression across viewports.

## Git Hooks (Husky)

Pre-commit hook (`.husky/pre-commit`) runs on staged files:

1. ESLint (auto-fix and re-stage)
2. Prettier (format and re-stage)
3. Unit tests (blocks commit if tests fail)

Only processes staged files, not entire codebase.

## Git LFS

Test snapshots (`tests/e2e/**/*-snapshots/**/*.png`) are tracked with Git LFS.

**First-time setup**:

```sh
brew install git-lfs  # macOS
git lfs install
git lfs pull
```

## Configuration Files

- **Build**: `vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`
- **TypeScript**: `tsconfig*.json` (base, app, node, vitest)
- **Code Quality**: `eslint.config.ts`, `.prettierrc.json`
- **Styling**: Tailwind CSS v4 via Vite plugin (no separate config file)

## TypeScript & IDE

- Uses `vue-tsc` for type checking
- VS Code: Install [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension
- Disable Vetur if installed (conflicts)

## Development Workflow

1. Make changes
2. Run tests: `pnpm test:unit` and `pnpm test:e2e`
3. Update snapshots if UI changed: `pnpm test:e2e:update-snapshots`
4. Commit: Pre-commit hooks handle linting/formatting

**Best Practices**:

- Write unit tests for component logic
- Write E2E tests for user flows
- Use test factories for consistent test data
- Update visual snapshots for intentional UI changes

## Troubleshooting

**Tests fail after pulling**:

1. `pnpm install`
2. `git lfs pull`
3. `pnpm exec playwright install`

**Build errors**:

- Verify Node.js version matches `package.json` engines
- Run `pnpm type-check` to see TypeScript errors
- Clear and reinstall: `rm -rf node_modules pnpm-lock.yaml && pnpm install`

**Git LFS issues**:

- If snapshots show as pointers: `git lfs pull`
- If not installed: `brew install git-lfs && git lfs install`

## Environment Variables

### Application Configuration

- `VITE_CONTACT_API_URL` - Contact form API endpoint URL
  - Required for staging/production environments
  - Set in Netlify dashboard for deployed environments
  - For local development, create `.env` file with this variable

- `VITE_CONTACT_API_ENABLED` - Enable/disable API calls
  - Defaults to `true` in production
  - Automatically set to `false` in unit test environment (see `vitest.config.ts`)
  - Used to ensure unit tests are no-ops (no actual HTTP requests)

- `VITE_CONTACT_FORM_ENABLED` - Enable/disable contact form feature visibility
  - Defaults to `false` (disabled) - contact form and navigation link are hidden
  - Set to `'true'` to enable the contact form feature
  - Controls both the contact form section and the "Contact" navigation item

### Testing Configuration

- `PLAYWRIGHT_BASE_URL` - Base URL for Playwright e2e tests
  - Defaults to `http://localhost:5173` (dev) or `http://localhost:4173` (preview)
  - Set to staging URL in CI to test against live staging environment
  - When set, Playwright will not start a local web server

### Local Development Setup

Create a `.env` file in the project root:

```env
VITE_CONTACT_API_URL=https://your-staging-endpoint.com/api/contact
```

## Deployment

### Staging Deployment

Staging deployment is automated via GitHub Actions:

**Workflow**: `.github/workflows/deploy-staging.yml`

**Process**:

1. **Unit Tests**: Run `pnpm test:unit` with `VITE_CONTACT_API_ENABLED=false`
2. **Build**: Build application using `pnpm build`
3. **Deploy**: Deploy to Netlify staging using Netlify CLI
4. **E2E Tests**: Run Playwright tests against live staging URL

**Configuration**:

- Triggered on push to `develop` branch
- Requires GitHub secrets: `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`
- Staging URL format: `https://develop--<site-id>.netlify.app`

**Netlify Setup**:

1. Create Netlify site (if not already done)
2. Configure `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` as GitHub secrets
3. Set `VITE_CONTACT_API_URL` in Netlify dashboard for staging environment

### Testing Strategy

- **Unit Tests (Local)**: Run with `pnpm test:unit`, configured with no-op API behavior
- **Unit Tests (CI)**: Run in GitHub Actions before build/deploy with `VITE_CONTACT_API_ENABLED=false`
- **E2E Tests (Local)**: Run against local dev server (default behavior)
- **E2E Tests (Staging)**: Run automatically in GitHub Actions against live staging environment after deployment

## Notes

- **CI/CD**: Configured for staging deployment via GitHub Actions
- **Vue DevTools**: Automatically disabled when `NODE_ENV=test`
