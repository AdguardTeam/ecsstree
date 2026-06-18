# DEVELOPMENT.md

## Table of Contents

- [Prerequisites](#prerequisites)
    - [Required Tools](#required-tools)
    - [Recommended Tools](#recommended-tools)
- [Getting Started](#getting-started)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Verify the Setup](#verify-the-setup)
- [Development Workflow](#development-workflow)
    - [Branching Strategy](#branching-strategy)
    - [Code Style](#code-style)
    - [Running Tests](#running-tests)
    - [Building](#building)
- [Common Tasks](#common-tasks)
    - [Running a Single Test File](#running-a-single-test-file)
    - [Running the Full CI Pipeline Locally](#running-the-full-ci-pipeline-locally)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Additional Resources](#additional-resources)

## Prerequisites

### Required Tools

<!-- markdownlint-disable MD013 -->
| Tool | Minimum Version | How to Check |
| --- | --- | --- |
| **Node.js** | 20.x (latest LTS recommended) | `node --version` |
| **pnpm** | 10.x | `pnpm --version` |
<!-- markdownlint-enable MD013 -->

This project uses **pnpm** as its package manager. If you need to
install it:

```bash
npm install -g pnpm
```

### Recommended Tools

- **VS Code** with the ESLint extension.
- **Docker** — for running the CI pipeline locally.

## Getting Started

### Clone the Repository

```bash
git clone git@github.com:AdGuardSoftwareLimited/ext-ecsstree.git
cd ext-ecsstree
```

### Install Dependencies

```bash
pnpm install
```

This installs all dev dependencies (TypeScript, Rollup, vitest, ESLint,
husky, etc.) and runtime dependencies (`@adguard/css-tokenizer`,
`@eslint/css-tree`).

### Verify the Setup

Run the full check suite to confirm everything works:

```bash
pnpm lint && pnpm test && pnpm build
```

All three commands should pass without errors.

## Development Workflow

### Branching Strategy

1. Create a feature branch from `master`:

   ```bash
   git checkout master
   git pull origin master
   git checkout -b AG-XXXX-short-description
   ```

2. Make changes and commit using conventional commit messages.

3. Before pushing, run the full check suite:

   ```bash
   pnpm lint && pnpm test && pnpm build
   ```

4. Push your branch and open a pull request against `master`.

### Code Style

Code style is enforced by ESLint with the airbnb-base config and
additional plugins (import, jsdoc, n). The configuration is in
`.eslintrc.cjs`.

Run the linter:

```bash
pnpm lint
```

The lint command runs both ESLint and markdownlint. For code guidelines
and naming conventions, see [AGENTS.md](./AGENTS.md).

### Running Tests

Tests are written with vitest and live in the `test/` directory.

Run all tests:

```bash
pnpm test
```

Run tests with coverage:

```bash
pnpm test -- --coverage
```

### Building

<!-- markdownlint-disable MD013 -->
| Output | Path | Format |
| --- | --- | --- |
| ESM bundle | `dist/ecsstree.js` | ES Module |
| CJS bundle | `dist/ecsstree.cjs` | CommonJS |
| Type declarations | `dist/ecsstree.d.ts` | TypeScript declarations |
<!-- markdownlint-enable MD013 -->

Run the build:

```bash
pnpm build
```

The build uses Rollup 4 with TypeScript (via SWC) and produces CJS, ESM,
and type declaration outputs.

## Common Tasks

### Running a Single Test File

```bash
pnpm exec vitest run test/some-file.test.js
```

### Running the Full CI Pipeline Locally

The `Dockerfile` defines a multi-stage BuildKit pipeline. To run it
locally:

```bash
DOCKER_BUILDKIT=1 docker build --progress plain --target test-output .
```

To produce the release artifact:

```bash
DOCKER_BUILDKIT=1 docker build --progress plain --target build-output --output ./artifacts .
```

The artifact `ecsstree.tgz` will be in the `artifacts/` directory.

## Project Structure

```text
.
├── src/                         # Source code
├── test/                        # vitest test files
├── examples/                    # Example usage scripts
├── ecsstree.d.ts                # (Legacy) type declaration source
├── package.json                 # Package manifest and scripts
├── rollup.config.js             # Rollup build configuration
├── vitest.config.js             # vitest test configuration
├── tsconfig.json                # TypeScript configuration
├── .eslintrc.cjs                # ESLint configuration
├── .husky/                      # Git hooks (husky)
├── Dockerfile                   # Multi-stage CI build pipeline
├── .github/
│   └── workflows/
│       ├── ci.yml               # CI build and test on PRs
│       ├── mirror.yml           # Mirror to public repo on push to master
│       ├── prepare-release.yml  # Release PR creation
│       └── publish-release.yml  # Auto-tag + release pipeline
├── README.md                    # User-facing documentation
├── CHANGELOG.md                 # Release history
├── DEVELOPMENT.md               # This file
└── DEPLOYMENT.md                # Deployment and release process
```

## Troubleshooting

### Build Fails with Type Errors

1. Run `pnpm lint` first — many type errors are caught by ESLint.
2. Clear caches and rebuild:

   ```bash
   pnpm exec rimraf dist node_modules
   pnpm install
   pnpm build
   ```

### Tests Fail After Dependency Changes

1. Reinstall dependencies and retry:

   ```bash
   rm -rf node_modules
   pnpm install
   pnpm test
   ```

## Additional Resources

- [README.md](./README.md) — User-facing documentation and API reference
- [AGENTS.md](./AGENTS.md) — Code guidelines for LLM agents and
  contributors
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Deployment and release process
- [CHANGELOG.md](./CHANGELOG.md) — Release history
- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) — Changelog
  format used by this project
- [Semantic Versioning](https://semver.org/spec/v2.0.0.html) —
  Versioning scheme
