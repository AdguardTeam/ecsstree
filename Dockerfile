FROM adguard/node-ssh:22.22--0 AS base
SHELL ["/bin/bash", "-lc"]

RUN npm install -g pnpm@10.7.1

WORKDIR /ecsstree

ENV npm_config_store_dir=/pnpm-store

# ============================================================================
# Stage: deps
# Cached until package.json/pnpm-lock.yaml changes
# ============================================================================
FROM base AS deps

COPY package.json pnpm-lock.yaml ./

# --ignore-scripts: package.json has "prepare": "node .husky/install.js" which
# must not run in CI (requires git hooks setup).
RUN --mount=type=cache,target=/pnpm-store,id=ecsstree-pnpm \
    pnpm install --frozen-lockfile --ignore-scripts

# ============================================================================
# Stage: source
# Full source copy — parent for all lint/test/build stages
# ============================================================================
FROM deps AS source

COPY . /ecsstree

# ============================================================================
# Stage: lint
# Runs ESLint and markdownlint
# ============================================================================
FROM source AS lint

ARG BUILD_RUN_ID=""

RUN --mount=type=cache,target=/pnpm-store,id=ecsstree-pnpm \
    echo "${BUILD_RUN_ID}" > /tmp/.build-run-id && \
    mkdir -p /out && \
    touch /out/lint.txt && \
    pnpm lint

FROM scratch AS lint-output
COPY --from=lint /out/ /

# ============================================================================
# Stage: test
# Runs vitest
# Always exits 0 — exit code stored in /out/exit-code.txt for Bamboo to check
# ============================================================================
FROM source AS test

ARG BUILD_RUN_ID=""

RUN --mount=type=cache,target=/pnpm-store,id=ecsstree-pnpm \
    echo "${BUILD_RUN_ID}" > /tmp/.build-run-id && \
    mkdir -p /out && \
    pnpm test; echo $? > /out/exit-code.txt

FROM scratch AS test-output
COPY --from=test /out/ /

# ============================================================================
# Stage: build
# Creates the library build, runs smoke tests, packs .tgz for npm publish,
# and exports build.txt for Bamboo variable injection
# ============================================================================
FROM source AS build

ARG BUILD_RUN_ID=""

RUN --mount=type=cache,target=/pnpm-store,id=ecsstree-pnpm \
    echo "${BUILD_RUN_ID}" > /tmp/.build-run-id && \
    pnpm build && \
    pnpm test:smoke && \
    pnpm pack --out ecsstree.tgz && \
    mkdir -p /out/artifacts && \
    mv ecsstree.tgz /out/artifacts/ && \
    cp build.txt /out/artifacts/

FROM scratch AS build-output
COPY --from=build /out/ /
