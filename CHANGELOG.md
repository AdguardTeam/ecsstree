<!-- markdownlint-disable MD024 -->
# ECSSTree Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][keepachangelog], and this project adheres to [Semantic Versioning][semver].

[keepachangelog]: https://keepachangelog.com/en/1.0.0/
[semver]: https://semver.org/spec/v2.0.0.html

## [1.1.0] - 2024-09-10

### Fixed

- Export for Lexer-related tools: `keyword`, `property`, `vendorPrefix`, `isCustomProperty`.
  These functions are also exported by `css-tree` package.
- Custom types.

### Removed

- Browser specific builds.

[1.1.0]: https://github.com/AdguardTeam/ecsstree/compare/v1.0.8...v1.1.0

## [1.0.8] - 2022-02-27

### Added

- Support for `:matches-css-after(raw)` pseudo class [[uBO reference]][matches-css-after-ubo].
- Support for `:matches-css-before(raw)` pseudo class [[uBO reference]][matches-css-before-ubo].
- Support for `:matches-css(raw)` pseudo class [[ADG reference]][matches-css-ubo].

### Fixed

- README typos.

[1.0.8]: https://github.com/AdguardTeam/ecsstree/compare/v1.0.7...v1.0.8
[matches-css-after-ubo]: https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters#subjectmatches-css-afterarg
[matches-css-before-ubo]: https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters#subjectmatches-css-beforearg
[matches-css-ubo]: https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters#subjectmatches-cssarg

## [1.0.7] - 2022-02-22

### Fixed

- False positive parsing errors when using `:upward` pseudo class: [#8].

[#8]: https://github.com/AdguardTeam/ecsstree/pull/8
[1.0.7]: https://github.com/AdguardTeam/ecsstree/compare/v1.0.6...v1.0.7

## [1.0.6] - 2022-02-21

### Added

- Import types from `@types/css-tree`.
- Small example project in TypeScript.
- Integrate ESLint, some code style improvements.

### Fixed

- Remove Node warnings when running tests.

### Changed

- Exclude some unnecessary files from NPM release.
- Move package under `AdguardTeam` organization.

[1.0.6]: https://github.com/AdguardTeam/ecsstree/compare/v1.0.5...v1.0.6

## [1.0.4] - 2022-02-19

### Changed

- Browser builds now ends with `.min.js`.
- README improvements.

[1.0.4]: https://github.com/AdguardTeam/ecsstree/compare/v1.0.3...v1.0.4

## [1.0.3] - 2022-02-19

### Fixed

- Minor optimizations, README improvements.

[1.0.3]: https://github.com/AdguardTeam/ecsstree/compare/v1.0.2...v1.0.3

## [1.0.2] - 2022-02-18

### Fixed

- Change `:-abp-has` to selector list instead of selector.

[1.0.2]: https://github.com/AdguardTeam/ecsstree/compare/v1.0.1...v1.0.2

## [1.0.1] - 2022-02-18

### Fixed

- Improved `:contains` (and `:-abp-contains` & `:has-text`) pseudo class parsing,
  handle parenthesis / function calls in the parameter.

[1.0.1]: https://github.com/AdguardTeam/ecsstree/compare/v1.0.0...v1.0.1

## [1.0.0] - 2022-02-18

### Added

- Initial version of the library.
- Support for `:-abp-contains(text / regexp)` pseudo class [[ABP reference]][abp-extcss].
- Support for `:-abp-has(selector)` pseudo class [[ABP reference]][abp-extcss].
- Support for `:contains(text / regexp)` pseudo class [[ADG reference]][contains-adg].
- Support for `:has-text(text / regexp)` pseudo class [[uBO reference]][has-text-ubo].
- Support for `:if-not(selector)` pseudo class [[ADG reference]][if-not-adg].
- Support for `:matches-media(media query list)` pseudo class [[uBO reference]][matches-media-ubo].
- Support for `:min-text-length(number)` pseudo class [[uBO reference]][min-text-length-ubo].
- Support for `:nth-ancestor(number)` pseudo class [[ADG reference]][nth-ancestor-adg].
- Support for `:style(style declaration list)` pseudo class [[uBO reference]][style-ubo].
- Support for `:upward(selector / number)` pseudo class [[ADG reference]][upward-adg], [[uBO reference]][upward-ubo].
- Support for `:xpath(xpath expression)` pseudo class [[ADG reference]][xpath-adg], [[uBO reference]][xpath-ubo].

[1.0.0]: https://github.com/AdguardTeam/ecsstree/releases/tag/v1.0.0
[abp-extcss]: https://help.adblockplus.org/hc/en-us/articles/360062733293#elemhide_css
[contains-adg]: https://github.com/AdguardTeam/ExtendedCss#extended-css-contains
[has-text-ubo]: https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters#subjecthas-textneedle
[if-not-adg]: https://github.com/AdguardTeam/ExtendedCss#extended-css-if-not
[matches-media-ubo]: https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters#subjectmatches-mediaarg
[min-text-length-ubo]: https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters#subjectmin-text-lengthn
[nth-ancestor-adg]: https://github.com/AdguardTeam/ExtendedCss#extended-css-nth-ancestor
[style-ubo]: https://github.com/gorhill/uBlock/wiki/Static-filter-syntax#subjectstylearg
[upward-adg]: https://github.com/AdguardTeam/ExtendedCss#extended-css-upward
[upward-ubo]: https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters#subjectupwardarg
[xpath-adg]: https://github.com/AdguardTeam/ExtendedCss#-pseudo-class-xpath
[xpath-ubo]: https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters#subjectxpatharg
