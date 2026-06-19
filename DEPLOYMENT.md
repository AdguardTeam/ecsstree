# DEPLOYMENT.md

## Table of Contents

- [Overview](#overview)
- [Publishing Destinations](#publishing-destinations)
    - [npm Registry](#npm-registry)
    - [GitHub Releases](#github-releases)
- [CI/CD Workflows](#cicd-workflows)
    - [CI (`ci.yml`)](#ci-ciyml)
    - [Mirror (`mirror.yml`)](#mirror-mirroryml)
    - [Prepare Release (`prepare-release.yml`)](#prepare-release-prepare-releaseyml)
    - [Publish Release (`publish-release.yml`)](#publish-release-publish-releaseyml)
- [Release Process](#release-process)
    - [Step-by-Step](#step-by-step)
    - [Pipeline Stages](#pipeline-stages)
- [GitHub Environment](#github-environment)
- [Notifications](#notifications)
- [Troubleshooting](#troubleshooting)

## Overview

`@adguard/ecss-tree` is deployed as an **npm package** and a
**GitHub Release** on the public mirror. There is no server, database,
or runtime infrastructure — the library is consumed by other packages
via the npm registry.

Deployment is automated through GitHub Actions workflows. The release
process is triggered by manually creating a release PR, which then tags
and publishes after merge.

The package is developed in the private repository
`AdGuardSoftwareLimited/ext-ecsstree` and mirrored to the public
repository `AdguardTeam/ecsstree`. GitHub Releases are created on the
public mirror.

## Publishing Destinations

### npm Registry

- **Package name**: `@adguard/ecss-tree`
- **Registry**: https://registry.npmjs.org/
- **Visibility**: public
- **Publishing method**: npm trusted publishing (OIDC-based, no tokens)

Trusted publishing links the GitHub Actions environment to the npm
package using OpenID Connect. No npm access token is stored —
authentication is handled automatically by the GitHub runner.

### GitHub Releases

- **Repository**: `AdguardTeam/ecsstree` (public mirror)
- **Format**: release created automatically on the public mirror
- **Artifact**: `ecsstree.tgz` is attached to each release
- **Release notes**: extracted automatically from `CHANGELOG.md`

## CI/CD Workflows

All workflows live in `.github/workflows/`.

### CI (`ci.yml`)

Runs on every pull request and push to `master`.

| Trigger | Purpose |
| --- | --- |
| `pull_request` | Lint, test, and build on PRs |
| `push` to `master` | Lint, test, and build on merge |

Builds and tests run inside the project's Docker container via
`docker build --target test-output`.

### Mirror (`mirror.yml`)

Mirrors code from the private repo to the public mirror
(`AdguardTeam/ecsstree`) on every push to `master`, using the shared
`mirror.yml` workflow from `AdGuardSoftwareLimited/actions`.

### Prepare Release (`prepare-release.yml`)

Manually triggered workflow that opens a release pull request.

| Trigger | Purpose |
| --- | --- |
| `workflow_dispatch` | Manual trigger with tag input (e.g., `v1.2.0`) |

Calls the shared `create-release-pr.yml` workflow from
`AdGuardSoftwareLimited/actions` which:

1. Validates the tag and resolves version metadata via `version-metadata.yml`
2. Patches `CHANGELOG.md` — resets `[Unreleased]`, adds a new version section, updates reference links
3. Commits the changelog on a `release-bump/v{version}` branch
4. Opens a PR (attributed to the Octopass app via Octopass token)

**No tags are created by this workflow** — it only opens a PR.

### Publish Release (`publish-release.yml`)

Automatically triggered when a release PR is merged, or manually for
re-runs. Handles tagging, building, testing, publishing, mirroring,
release creation, and notification in a single workflow.

| Trigger | Purpose |
| --- | --- |
| `pull_request: [closed]` | Auto-fires when a release PR is merged |
| `workflow_dispatch` with ref input | Manual re-run of failed release |

Jobs (sequential, each depends on the previous):

| Job | Runner | Purpose |
| --- | --- | --- |
| `tag` | `team-extensions` (shared) | Parse CHANGELOG, create `v{version}` tag |
| `build` | `team-extensions` | Inject version, lint and test via Docker, build `ecsstree.tgz` |
| `publish` | `ubuntu-latest` | Publish to npm via trusted publishing |
| `mirror-and-release` | `team-extensions` (shared) | Mirror to public repo, create GitHub Release |
| `notify` | `team-extensions` (shared) | Slack notification |

**Version injection**: The source `package.json` has no `version` field.
CI injects the tag-derived version via `npm pkg set version=X` before
building.

## Release Process

### Step-by-Step

1. **Developer**: Go to **Actions → Prepare release → Run workflow**,
   enter tag (e.g., `v1.2.0`)
2. **CI**: Opens PR: `release-bump/v1.2.0` → `master` with finalized
   `CHANGELOG.md`
3. **Reviewer**: Review the PR body (shows changelog section), approve,
   merge
4. **CI**: `publish-release.yml` auto-fires: creates tag `v1.2.0` →
   inject → lint → test → build → npm publish → mirror + GitHub Release
   → Slack

### Pipeline Stages

```text
Prepare release (manual)
     │
     ▼
  PR opens (CHANGELOG finalized)
     │
     ▼
  Merge PR
     │
     ▼
  Publish release (auto)
     │
     ▼
  tag → build → publish → mirror-and-release → notify
```
<!-- markdownlint-enable MD029 -->

## GitHub Environment

The `publish` job uses the **`extensions`** GitHub environment.

| Setting | Value |
| --- | --- |
| **Environment name** | `extensions` |
| **Protection rules** | Configured in repository settings |
| **Purpose** | Restricts who can publish to npm |

This environment gates the npm publish step — only workflows that
reference the `extensions` environment can access the OIDC token for
trusted publishing.

## Notifications

Successful releases post to Slack via the shared
`AdGuardSoftwareLimited/actions/actions/slack` action.

| Parameter | Value |
| --- | --- |
| **Channel** | `#adguard-extension-vcs` |
| **Product name** | `@adguard/ecss-tree` |
| **Message** | `published to npm` |

Slack notification failures are non-blocking — the release continues
even if Slack is unreachable.

## Troubleshooting

### Release pipeline fails with "No released version found in CHANGELOG.md"

The `publish-release.yml` workflow expects `CHANGELOG.md` to follow
keepachangelog format with bracket version headings
(`## [X.Y.Z] - date`). Ensure the latest version heading matches this
format.

### Tag creation fails

Check that `CHANGELOG.md` has a `## [Unreleased]` section at the top.
The `create-release-pr` workflow requires this to finalize the
changelog.

### npm publish fails

Check that the `extensions` environment is correctly configured in
repository settings and that the npm package has trusted publishing
enabled for `AdGuardSoftwareLimited/ext-ecsstree`.

### Re-running a failed release

If `publish-release.yml` fails after the tag was created, go to
**Actions → Publish release → Run workflow** and enter the ref (e.g.,
`v1.2.0` or a commit SHA). This manually triggers the release pipeline.
