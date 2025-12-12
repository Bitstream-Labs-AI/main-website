# Bitstream Labs.AI Website

Minimal stealth mode website for Bitstream Labs.AI - Expert AI Benchmarking & Hardware Consulting.

Built with Vue 3, TypeScript, Vite, and Tailwind CSS v4.

## Quick Start

### Prerequisites

- **Node.js**: `^20.19.0 || >=22.12.0` (see `package.json`)
- **pnpm**: Package manager (`npm install -g pnpm`)

### Setup

1. Install dependencies: `pnpm install`
2. Install Playwright browsers: `pnpm exec playwright install`
3. Start dev server: `pnpm dev`

Available at `http://localhost:5173`.

### Available Commands

See `package.json` scripts section for all available commands. Common ones:

- `pnpm dev` - Start development server
- `pnpm test:unit` - Run unit tests
- `pnpm test:e2e` - Run E2E tests
- `pnpm build` - Build for production
- `pnpm lint` - Lint code
- `pnpm format` - Format code

## Documentation

For development details, see [DEVELOPMENT.md](./DEVELOPMENT.md).

## Environment Variables

### Application Environment Variables

- `VITE_CONTACT_API_URL` - Contact form API endpoint URL (required for staging/production)
- `VITE_CONTACT_API_ENABLED` - Enable/disable API calls (defaults to true, set to false in tests)
- `VITE_CONTACT_FORM_ENABLED` - Enable/disable contact form feature visibility (defaults to false, set to 'true' to enable)

### Testing Environment Variables

- `PLAYWRIGHT_BASE_URL` - Base URL for Playwright e2e tests (defaults to localhost, set to staging URL in CI)

For local development, create a `.env` file in the project root:

```env
VITE_CONTACT_API_URL=https://your-staging-endpoint.com/api/contact
```

## Deployment

### Staging Deployment

The project uses GitHub Actions for automated staging deployment:

- **Trigger**: Push to `develop` branch
- **Workflow**: `.github/workflows/deploy-staging.yml`
- **Process**:
  1. Run unit tests
  2. Build application
  3. Deploy to Netlify staging
  4. Run Playwright e2e tests against live staging environment

**Required GitHub Secrets**:

- `NETLIFY_AUTH_TOKEN` - Netlify authentication token
- `NETLIFY_SITE_ID` - Netlify site ID

## Notes

- **CI/CD**: Configured for staging deployment via GitHub Actions
- **Git LFS**: Required for test snapshots (see [DEVELOPMENT.md](./DEVELOPMENT.md))
