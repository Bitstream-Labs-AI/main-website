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

## Notes

- **CI/CD**: Not configured - local development only
- **Git LFS**: Required for test snapshots (see [DEVELOPMENT.md](./DEVELOPMENT.md))
