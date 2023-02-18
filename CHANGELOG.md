# ECSSTree Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2022-02-18

### Added

- Initial version of the library
- Support for `:-abp-contains(text / regexp)` pseudo class [[ABP reference]](https://help.adblockplus.org/hc/en-us/articles/360062733293#elemhide_css)
- Support for `:-abp-has(selector)` pseudo class [[ABP reference]](https://help.adblockplus.org/hc/en-us/articles/360062733293#elemhide_css)
- Support for `:contains(text / regexp)` pseudo class [[ADG reference]](https://github.com/AdguardTeam/ExtendedCss#extended-css-contains)
- Support for `:has-text(text / regexp)` pseudo class [[uBO reference]](https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters#subjecthas-textneedle)
- Support for `:if-not(selector)` pseudo class [[ADG reference]](https://github.com/AdguardTeam/ExtendedCss#extended-css-if-not)
- Support for `:matches-media(media query list)` pseudo class [[uBO reference]](https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters#subjectmatches-mediaarg)
- Support for `:min-text-length(number)` pseudo class [[uBO reference]](https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters#subjectmin-text-lengthn)
- Support for `:nth-ancestor(number)` pseudo class [[ADG reference]](https://github.com/AdguardTeam/ExtendedCss#extended-css-nth-ancestor)
- Support for `:style(style declaration list)` pseudo class [[uBO reference]](https://github.com/gorhill/uBlock/wiki/Static-filter-syntax#subjectstylearg)
- Support for `:upward(selector / number)` pseudo class [[ADG reference]](https://github.com/AdguardTeam/ExtendedCss#extended-css-upward), [[uBO reference]](https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters#subjectupwardarg)
- Support for `:xpath(xpath expression)` pseudo class [[ADG reference]](https://github.com/AdguardTeam/ExtendedCss#-pseudo-class-xpath), [[uBO reference]](https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters#subjectxpatharg)
