# Stealth Mode Website MVP

## Overview

Build a minimal stealth mode website for Bitstream Labs.AI that displays the company's mission and vision statements, includes a contact form for inquiries, and provides links to GitHub. This is a simple, professional landing page to establish online presence while in stealth mode.

## Mission Statement

**We set the standard in AI benchmarking by providing expert consulting to R&D teams pushing the boundaries of intelligent hardware.**

## Vision Statement

**To unite AI and hardware engineering into a single, unified workflow, turning AI models into simple components for seamless deployment targets.**

## Development Process Standards

All implementation must follow the project's development process standards:

### Test-Driven Development (TDD)

- **Red → Green → Refactor Cycle**: Always write failing tests first, implement minimal code to pass, then refactor
- **Start with Failing Tests**: Write the simplest failing test that defines a small increment of functionality
- **Minimal Implementation**: Write just enough code to make the test pass - no more
- **Meaningful Test Names**: Use descriptive test names that describe behavior
- **Clear Test Failures**: Make test failures informative and actionable

### Tidy First Approach

- **Separate Structural and Behavioral Changes**: Never mix structural changes (renaming, extracting methods) with behavioral changes (adding functionality) in the same commit
- **Structural Changes First**: When both types are needed, make structural changes first
- **Validate Structural Changes**: Run tests before and after structural changes to ensure behavior is unchanged

### Commit Discipline

- Only commit when:
  - **All** tests are passing
  - **All** compiler/linter warnings are resolved
  - The change represents a single logical unit of work
  - Commit messages clearly state whether the commit contains structural or behavioral changes

### TypeScript Best Practices

- **Strict Mode Mandatory**: All `tsconfig.json` files must enable `"strict": true`
- **Test Data Factories**: Use factory functions (e.g., `createMockContactFormData()`) for test data with optional `overrides?: Partial<T>`
- **Avoid `any`**: Use `unknown` for values of unknown type with explicit type-narrowing checks
- **Pragmatic Testing**: Use temporary directories for file system tests, prefer real implementations for cheap tests

### Package Management

- **Use pnpm commands programmatically**:
  - `pnpm create vue@latest` or `pnpm dlx create-vue@latest` for scaffolding
  - `pnpm add <package>` for adding dependencies
  - `pnpm add -D <package>` for dev dependencies
  - Never manually create `package.json` or configuration files that can be generated

## Task Organization

Per task standards, all tasks should be:

- **Granular**: Completable in 1-4 hours
- **Actionable by Code**: Focus on writing, modifying, or testing code
- **Independently Testable**: Can be verified through automated tests
- **Follow TDD**: Red-Green-Refactor cycle
- **Build Incrementally**: Each task builds on previous tasks

## Implementation Steps

### Phase 1: Project Foundation

**1.1 Initialize Vite + Vue + TypeScript Project**

**Objective**: Scaffold a new Vue 3 project with TypeScript, testing, and routing configured programmatically.

**Acceptance Criteria**:

- Project scaffolded using `pnpm create vue@latest` or `pnpm dlx create-vue@latest`
- TypeScript, Router, Vitest, and Playwright options selected during scaffolding
- `tsconfig.json` has `"strict": true` enabled (mandatory)
- All configuration files generated programmatically (not manually created)

**Test Strategy**: Verify project structure exists, `tsconfig.json` has strict mode enabled, and all scaffolded files are present.

**Implementation**:

- Run `pnpm create vue@latest` or `pnpm dlx create-vue@latest` with interactive prompts
- Select: TypeScript, Router, Vitest, Playwright
- Verify `tsconfig.json` contains `"strict": true`
- Configure `vite.config.ts` for basic setup

**1.2 Configure Tailwind CSS**

**Objective**: Set up Tailwind CSS with Industrial Futurist brand colors using programmatic commands.

**Acceptance Criteria**:

- Tailwind installed via `pnpm add -D tailwindcss postcss autoprefixer`
- Configuration files generated via `pnpm dlx tailwindcss init -p`
- "Industrial Futurist" brand colors configured in `tailwind.config.js`
- Tailwind classes work correctly

**Test Strategy**: Verify Tailwind classes work in a test component.

**Implementation**:

- Run `pnpm add -D tailwindcss postcss autoprefixer`
- Run `pnpm dlx tailwindcss init -p` to generate config files
- Configure `tailwind.config.js` with brand colors
- Add Tailwind directives to CSS

### Phase 2: Core Pages

**2.1 Create Home Page**

**Objective**: Build a home page that displays mission and vision statements with clean, professional typography.

**Acceptance Criteria**:

- Home page displays mission statement prominently
- Home page displays vision statement prominently
- Typography is clean and professional
- Page is responsive and accessible
- SEO meta tags are present

**Test Strategy**:

- E2E test: Verify mission and vision statements are visible on home page
- Unit test: Verify page component renders correctly

**Implementation**:

- Create `src/pages/Home.vue` or use `src/pages/index.vue`
- Display mission statement in a prominent section
- Display vision statement in a prominent section
- Use Tailwind classes for styling
- Add appropriate heading hierarchy for accessibility
- Add SEO meta tags (title, description)

**2.2 Create Contact Form**

**Objective**: Build a contact form component with validation and submission handling using TDD.

**Acceptance Criteria**:

- Tests written first (Red phase)
- Form has fields: name, email, message
- Form validation works (required fields, email format)
- Form submission handler implemented
- All tests passing (Green phase)
- Code refactored for clarity (Refactor phase)

**Test Strategy**:

- Write tests first using test data factories
- Test form validation (required fields, email format)
- Test form submission
- Test error states
- E2E test: Verify form can be filled and submitted

**Implementation** (after tests pass):

- Create `src/components/ContactForm.vue`
- Add form fields: name, email, message
- Implement validation logic
- Add form submission handler (can be a placeholder for now, or integrate with email service)
- Display validation errors
- Show success/error messages

**2.3 Add GitHub Links**

**Objective**: Add GitHub organization/profile links to the site navigation or footer.

**Acceptance Criteria**:

- GitHub links are visible and accessible
- Links open in new tab
- Links point to correct GitHub organization/profile
- Links are styled appropriately

**Test Strategy**:

- E2E test: Verify GitHub links are present and clickable
- Verify links open in new tab

**Implementation**:

- Add GitHub links to navigation or footer component
- Use appropriate icon (GitHub logo or text)
- Configure links to open in new tab (`target="_blank"`, `rel="noopener noreferrer"`)
- Style links to match site design

### Phase 3: Testing Setup

**3.1 Configure Vitest for Unit Testing**

**Objective**: Set up Vitest with proper configuration and test utilities for co-located unit tests.

**Acceptance Criteria**:

- Vitest configured with Vue Test Utils and jsdom environment
- Test utilities created in `src/test-utils/`
- Test data factories implemented
- Global test setup configured
- Tests can be run with `pnpm test`
- Test discovery configured for co-located tests

**Test Strategy**: Verify Vitest runs successfully with a simple test, test utilities are accessible, and factories work correctly.

**Implementation**:

- Create `vitest.config.ts` with Vue plugin and jsdom environment
- Configure test discovery:

  ```typescript
  include: [
    'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
  ],
  exclude: ['node_modules', 'dist', 'tests/e2e']
  ```

- Set up test utilities in `src/test-utils/`:
  - `setup.ts` for global test configuration
  - `helpers.ts` for common test helpers
  - `factories.ts` for test data factories (e.g., `createMockContactFormData()`)
- Configure test scripts in `package.json`: `"test": "vitest"`, `"test:ui": "vitest --ui"`

**3.2 Configure Playwright for E2E Testing**

**Objective**: Set up Playwright for E2E testing with proper configuration.

**Acceptance Criteria**:

- Playwright installed and configured
- `playwright.config.ts` created with browser configurations
- Test directory set to `tests/e2e/`
- Tests can be run with `pnpm test:e2e`

**Test Strategy**: Verify Playwright runs successfully, browsers are configured, and test directory structure is correct.

**Implementation**:

- Install `@playwright/test` via `pnpm add -D @playwright/test`
- Create `playwright.config.ts` with:
  - `testDir: './tests/e2e'` to point to E2E test directory
  - Browser configurations (Chromium, Firefox, WebKit)
  - Base URL for application under test
- Create E2E test directory structure: `tests/e2e/`
- Configure test scripts: `"test:e2e": "playwright test"`, `"test:e2e:ui": "playwright test --ui"`

**3.3 Write Unit Tests**

**Objective**: Create comprehensive unit tests for contact form component using co-located test files.

**Acceptance Criteria**:

- Unit tests co-located with source files (e.g., `ContactForm.test.ts` next to `ContactForm.vue`)
- Test data factories created in `src/test-utils/factories.ts`
- All tests follow TDD methodology (written before implementation)
- Tests focus on behavior, not implementation details
- All tests passing

**Test Strategy**:

- **Contact form** (co-located `ContactForm.test.ts`):
  - Use test data factories for form data
  - Test form validation (required fields, email format)
  - Test form submission
  - Test error states
  - Test success states

**3.4 Write E2E Tests**

**Objective**: Create E2E tests for critical user flows.

**Acceptance Criteria**:

- E2E tests in `tests/e2e/` directory
- Tests organized by feature
- All critical user flows covered
- Tests run in CI/CD pipeline

**Test Strategy**:

- **Home page** (`tests/e2e/home.spec.ts`):
  - Verify mission statement is visible
  - Verify vision statement is visible
  - Verify page loads correctly
- **Contact form** (`tests/e2e/contact.spec.ts`):
  - Verify form can be filled out
  - Verify validation works
  - Verify form can be submitted
- **GitHub links** (`tests/e2e/github-links.spec.ts`):
  - Verify GitHub links are present
  - Verify links are clickable
  - Verify links open in new tab

## File Structure

```
bitstream-labs.ai-website/
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── tailwind.config.js
├── tsconfig.json
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── pages/
│   │   ├── Home.vue (or index.vue)
│   │   └── Home.test.ts  # Co-located unit test
│   ├── components/
│   │   ├── ContactForm.vue
│   │   ├── ContactForm.test.ts  # Co-located unit test
│   │   ├── Navigation.vue (or Footer.vue)
│   │   └── Navigation.test.ts
│   └── test-utils/             # Shared test utilities
│       ├── setup.ts           # Vitest global setup
│       ├── helpers.ts         # Test helper functions
│       └── factories.ts       # Test data factories
├── tests/
│   └── e2e/                   # E2E tests (separate directory)
│       ├── home.spec.ts
│       ├── contact.spec.ts
│       └── github-links.spec.ts
└── public/
    └── (static assets)
```

## Key Dependencies

- **vite**: Build tool
- **vue**: Framework
- **vue-router**: Routing
- **typescript**: Type safety
- **tailwindcss**: Styling
- **vitest**: Unit testing framework
- **@vue/test-utils**: Vue component testing utilities
- **jsdom**: DOM environment for unit tests
- **@playwright/test**: E2E testing framework

## Testing Strategy

### Test File Organization

**Unit Tests - Co-located with Source Code**:

- Place unit test files adjacent to the source files they test
- Use naming convention: `ComponentName.test.ts` next to `ComponentName.vue`
- Example: `src/components/ContactForm.vue` → `src/components/ContactForm.test.ts`

**E2E Tests - Separate Directory**:

- All E2E tests in `tests/e2e/` directory (separate from source code)
- Organized by feature: `tests/e2e/home.spec.ts`, `tests/e2e/contact.spec.ts`

**Test Utilities - Centralized**:

- Shared test utilities in `src/test-utils/`:
  - `factories.ts`: Test data factories (e.g., `createMockContactFormData()`)
  - `helpers.ts`: Common test helper functions
  - `setup.ts`: Vitest global setup configuration

### Unit Testing (Vitest)

- **Follow TDD methodology**: Red → Green → Refactor cycle
- **Use test data factories** for all test data
- **Test behavior, not implementation**
- **Co-located test files**: `ComponentName.test.ts` next to `ComponentName.vue`

### E2E Testing (Playwright)

- **Separate directory structure**: All E2E tests in `tests/e2e/`
- **Feature-based organization**: One spec file per feature
- **Minimal suite**: Focus only on critical user journeys

## Deployment Considerations

- Static site can be deployed to Vercel/Netlify
- No backend required for MVP (contact form can use form service or be placeholder)
- Environment variables for any API keys (if contact form uses email service)
