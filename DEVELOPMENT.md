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

## Notes

- **CI/CD**: Not configured - local development only
- **Vue DevTools**: Automatically disabled when `NODE_ENV=test`
