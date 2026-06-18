# AGENTS.md

## Table Of Contents

- [Project Overview](#project-overview)
- [Technical Context](#technical-context)
- [Project Structure](#project-structure)
- [Build And Test Commands](#build-and-test-commands)
- [Contribution Instructions](#contribution-instructions)
- [Code Guidelines](#code-guidelines)
    - [System Design](#system-design)
    - [Architecture](#architecture)
    - [Code Quality](#code-quality)
    - [Testing](#testing)
    - [Dependency Management](#dependency-management)
    - [Configuration & Documentation](#configuration--documentation)
    - [Releases & CI/CD](#releases--cicd)
    - [Markdown Formatting](#markdown-formatting)

## Project Overview

`@adguard/ecss-tree` is an adblock Extended CSS supplement for
[CSSTree](https://github.com/csstree/csstree). It changes the internal
behavior of the CSSTree parser to support Extended CSS (ECSS) language
elements (adblock-specific pseudo classes such as `:-abp-has`,
`:contains`, `:xpath`, etc.) without changing the API or AST structure.
It is fully backwards compatible with CSSTree.

The library targets JavaScript/TypeScript consumers that need to parse
and validate adblock Extended CSS selectors. It is a drop-in
replacement for `css-tree`.

The package is developed in the private repository
`AdGuardSoftwareLimited/ext-ecsstree` and mirrored to the public
repository `AdguardTeam/ecsstree`.

## Technical Context

| Category | Detail |
| --- | --- |
| **Language / Version** | JavaScript (ES module, `"type": "module"`) |
| **Runtime** | Node.js >= 20; browser consumers |
| **Package Manager** | pnpm 10.x |
| **Build** | Rollup 4 (via SWC) → CJS + ESM + type declarations |
| **Test** | vitest 3.x |
| **Linter** | ESLint 8 (airbnb-base + import, jsdoc, n plugins) |
| **Markdown Linting** | markdownlint-cli |
| **Primary Dependencies** | `@adguard/css-tokenizer`, `@eslint/css-tree` |
| **Storage** | N/A |
| **Target Platform** | Browser and Node.js (library) |
| **Project Type** | Library / Package |
| **Performance Goals** | N/A |
| **Constraints** | Must remain AST-compatible with CSSTree |
| **Scale / Scope** | Consumed by AdGuard adblock tooling |

## Project Structure

```text
.
├── src/                         # Source code
├── test/                        # vitest test files
├── examples/                    # Example usage scripts
├── ecsstree.d.ts                # Type declaration source
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
├── DEVELOPMENT.md               # Local development setup guide
└── DEPLOYMENT.md                # Deployment and release process
```

## Build And Test Commands

| Command | Description |
| --- | --- |
| `pnpm build` | Build CJS + ESM + type declarations via Rollup |
| `pnpm test` | Run vitest test suite |
| `pnpm lint` | Run ESLint + markdownlint |
| `pnpm increment` | Bump patch version (no git tag) |
| `pnpm test:smoke` | Run smoke tests (ESM, CJS, TypeScript consumers) |

## Contribution Instructions

- You MUST verify your changes with the linter and tests:

  ```bash
  pnpm lint
  pnpm test
  pnpm build
  ```

- You MUST update the unit tests for changed code.

- When making changes to the project structure, ensure the Project
  Structure section in `AGENTS.md` is updated and remains valid.

- When modifying CI workflows, ensure `prepare-release.yml` and
  `publish-release.yml` stay in sync. The version is derived from git
  tags (not `package.json`).

- Never change `package.json` version manually — it is not stored in
  source and is injected during CI from the git tag.

- After completing the task you MUST verify that the code you have
  written follows the Code Guidelines in this file.

## Code Guidelines

### System Design

Design for a library:

- The library is consumed by other code — keep side effects out of the
  default code path.
- Export a stable public API matching CSSTree's interface so it works as
  a drop-in replacement.
- Keep the AST structure identical to CSSTree — only the parser's
  internal behavior changes. Do not introduce new AST node types.
- Maintain backwards compatibility with CSSTree functions and vice
  versa.

### Architecture

- **Drop-in fork** — ECSSTree extends CSSTree's parser to recognize
  adblock Extended CSS pseudo classes. The API and AST are unchanged.
- **Re-tokenization** — for problematic selectors (`:contains`,
  `:xpath`), a special re-tokenization algorithm handles cases the
  standard tokenizer cannot parse.
- **Parameter parsing** — pseudo classes that expect a selector
  parameter (e.g., `:-abp-has`) are parsed as `Selector` nodes instead
  of `Raw`, enabling advanced validation.

### Code Quality

- Follow the airbnb-base ESLint config and existing code style.
- Use JSDoc comments for public functions.
- Handle errors by throwing descriptive `Error` objects with formatted
  messages (`e.formattedMessage`).

### Testing

- Tests live in `test/` and use vitest.
- Test both valid and invalid selectors, including problematic cases
  (e.g., `:contains(aaa'bbb)`).
- Smoke tests in `test/smoke/` verify the package works in ESM, CJS, and
  TypeScript consumer environments.

### Dependency Management

- **Runtime dependencies** are limited to `@adguard/css-tokenizer` and
  `@eslint/css-tree`.
- **Reputable sources only** — dependencies must come from
  well-established, actively maintained projects.
- **Minimize dependency count** — justify every addition.

### Configuration & Documentation

- Build configuration lives in `rollup.config.js`, `tsconfig.json`, and
  `vitest.config.js`.
- When changing build commands or project structure, update `AGENTS.md`
  (Project Structure and Build And Test Commands sections), `README.md`
  (if public API changes), and `DEVELOPMENT.md` (if local setup
  changes).
- When modifying CI workflows, ensure `prepare-release.yml` and
  `publish-release.yml` stay in sync. The version is derived from git
  tags (not `package.json`).

### Releases & CI/CD

- **Version source**: The version is derived from git tags, not
  `package.json`. The source `package.json` has no `version` field.
- **Release flow**: The release process follows two steps:
    1. **Create release PR** — Trigger `prepare-release.yml` via
       `workflow_dispatch` with the desired tag (e.g. `v1.2.0`). This
       calls `create-release-pr` which finalizes the `[Unreleased]`
       section in `CHANGELOG.md` and opens a PR.
    2. **Merge the PR** — Review and merge the release PR. The
       `publish-release.yml` workflow triggers automatically on merge,
       reads the latest version from `CHANGELOG.md`, creates the
       matching `v{version}` tag, builds, tests, publishes to npm,
       mirrors to the public repo, creates a GitHub Release, and sends
       a Slack notification.
- **Manual release**: `publish-release.yml` can also be triggered
  manually via `workflow_dispatch` with a ref input (useful for
  re-running a failed release).
- **Version injection**: CI injects the tag version into `package.json`
  via `npm pkg set version=X` before building, so the published npm
  package has the correct version.
- **No manual version bumps**: Never change `package.json` version by
  hand. Use the **Prepare release** workflow to start a release.
- **Changelog format**: `CHANGELOG.md` follows
  [Keep a Changelog](https://keepachangelog.com/) with version headings
  in bracket format (`## [X.Y.Z] - YYYY-MM-DD`).

### Markdown Formatting

All Markdown files MUST follow these formatting rules:

- **Line length**: Keep lines at most 80 characters, but do not wrap
  lines artificially short just to hit the limit. Lines inside fenced
  code blocks are exempt from this limit.
- **Unordered lists**: Use dashes (`-`) for bullet points. Indent nested
  list items by 4 spaces.
- **Continuation lines**: When a list item wraps to the next line, align
  the continuation with the first character of the item text, not the
  list marker.
- **Emphasis**: Use asterisks (`*`) for emphasis (`*italic*`,
  `**bold**`). Do NOT use underscores.
- **Headings**: Duplicate heading names are allowed only among sibling
  headings (same parent level). Avoid duplicates across different levels.
- **Inline HTML**: Avoid raw HTML in Markdown. The only allowed elements
  are `<a>`, `<p>`, `<details>`, `<summary>`, and `<img>`.
- **Trailing spaces**: Do NOT leave trailing whitespace on any line. Do
  NOT use two-space line breaks — use a blank line instead.
- **Bare URLs**: Bare URLs are permitted and do not need to be wrapped
  in angle brackets.
- **Table formatting**: Align table columns with padding when the table
  fits within 80 characters. If the table exceeds 80 characters, switch
  to a compact format using single spaces only.
