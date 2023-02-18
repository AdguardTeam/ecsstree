<img align="right" width="111" height="111"
     alt="CSSTree logo"
     src="https://raw.githubusercontent.com/csstree/csstree/master/assets/csstree-logo-rounded.svg"/>
     
# ECSSTree

[![NPM version](https://img.shields.io/npm/v/ecss-tree.svg)](https://www.npmjs.com/package/ecss-tree)
[![NPM Downloads](https://img.shields.io/npm/dm/ecss-tree.svg)](https://www.npmjs.com/package/ecss-tree)
[![LICENSE](https://img.shields.io/github/license/scripthunter7/ecsstree)](https://github.com/scripthunter7/ecsstree/blob/main/LICENSE)

"Adblock Extended CSS" supplement for [CSSTree](https://github.com/csstree/csstree). This allows you to manage the main adblock Extended CSS elements with tools from the CSSTree library. Generally, it supports AdGuard, uBlock Origin and Adblock Plus.

## Table of contents

- [ECSSTree](#ecsstree)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Currently supported Extended CSS elements](#currently-supported-extended-css-elements)
  - [Motivation](#motivation)
    - [Advanced validation](#advanced-validation)
  - [Handle problematic cases](#handle-problematic-cases)
  - [Example JavaScript code](#example-javascript-code)
  - [References](#references)

## Installation

- Using NPM:
  ```bash
  npm install ecss-tree
  ```
- Using Yarn:
  ```bash
  yarn add ecss-tree
  ```

NPM package: https://www.npmjs.com/package/ecss-tree

## Currently supported Extended CSS elements

- `:-abp-contains(text / regexp)`
- `:-abp-has(selector)`
- `:contains(text / regexp)`
- `:has-text(text / regexp)`
- `:if-not(selector)`
- `:matches-media(media query list)`
- `:min-text-length(number)`
- `:nth-ancestor(number)`
- `:style(style declaration list)`
- `:upward(selector / number)`
- `:xpath(xpath expression)`

If a pseudo class is unknown to CSSTree, it parses its parameters as raw (if possible - see [problematic cases](https://github.com/scripthunter7/ecsstree#handle-problematic-cases)).

The CSSTree library itself is quite flexible and error-tolerant, so it basically manages well the Extended CSS elements that are not (yet) included here.

## Motivation

For example, the following selector
```css
div:-abp-has(> section)
```
will be parsed by the default CSS Tree as follows
```json
{
    "type": "Selector",
    "loc": null,
    "children": [
        {
            "type": "PseudoClassSelector",
            "loc": null,
            "name": "-abp-has",
            "children": [
                {
                    "type": "Raw",
                    "loc": null,
                    "value": "> section"
                }
            ]
        }
    ]
}
```

The problem with this is that the `-abp-has` parameter is parsed as `Raw`, not as a `Selector`, since `-abp-has` is an unknown pseudo class in CSS.

This is where the ECSSTree library comes into play. It detects that `-abp-has` expects a selector as a parameter, i.e. it parses the passed parameter as a `Selector`. This means that the selector above will be parsed as follows:
```json
{
    "type": "Selector",
    "loc": null,
    "children": [
        {
            "type": "PseudoClassSelector",
            "loc": null,
            "name": "-abp-has",
            "children": [
                {
                    "type": "Selector",
                    "loc": null,
                    "children": [
                        {
                            "type": "Combinator",
                            "loc": null,
                            "name": ">"
                        },
                        {
                            "type": "TypeSelector",
                            "loc": null,
                            "name": "section"
                        }
                    ]
                }
            ]
        }
    ]
}
```

`Combinator` and similar Nodes are part of CSSTree, this fork simply specifies that the `-abp-has` parameter should be parsed as a selector. The nodes themselves are part of the CSSTree.

### Advanced validation

In addition, this approach enables a more advanced validation. For example, the default CSSTree does not throw an error when parsing the following selector:
```css
div:-abp-has(42)
```
since it doesn't know what `-abp-has` is, it simply parses 42 as `Raw`. ECSSTree parses the parameter as a selector, which will throw an error, since 42 is simply an invalid selector.

## Handle problematic cases

The library also handles problematic selectors, such as the following:
```css
div:contains(aaa'bbb)
```

This selector doesn't fully meet with CSS standards, so even if CSSTree's is flexible, it will not be able to parse it properly, because it will tokenize it as follows:

| Token type | Start index | End index | Source part |
| --- | --- | --- | --- |
| ident-token | 0 | 3 | div
| colon-token | 3 | 4 | :
| function-token | 4 | 13 | contains(
| ident-token | 13 | 16 | aaa
| string-token | 16 | 21 | 'bbb)

At quote mark (') tokenizer will think that a string is starting, and it tokenizes the rest of the input as a string. This is the normal behavior for the tokenizer, but it is wrong for us, since the parser will fail with an `")" is expected` error, as it doesn't found the closing parenthesis, since it thinks that the string is still open.

ECSSTree will handle this case by a special re-tokenization algorithm during the parsing process, when parser reaches this problematic point. This way, ECSSTree's parser will be able to parse this selector properly. It is also true for `xpath`.

## Example JavaScript code

Here is a very simple JavaScript code to illustrate the library. Otherwise, everything must be used in the same way as in CSSTree, since this library is a natural fork of CSSTree.

```javascript
const { parse, generate, toPlainObject, fromPlainObject } = require('ecss-tree');
const { inspect } = require('util');

// Some inputs to test
const inputs = [
    `div:-abp-has(> .some-class > a[href^="https://example.com"])`,
    `body:style(padding-top: 0 !important;):matches-media((min-width: 500px) and (max-width: 1000px))`,
    `section:upward(2):contains(aaa'bbb):xpath(//*[contains(text(),"()(cc")])`,
];

for (const input of inputs) {
    // Parse raw input to AST. This will throw an error if the input is not valid.
    // Don't forget to set context to 'selector', because CSSTree will try to parse
    // 'stylesheet' by default.
    const ast = parse(input, { context: 'selector' });

    // By default, AST uses a doubly linked list. To convert it to plain object, you can
    // use toPlainObject() function.
    // If you want to convert AST back to doubly linked list version, you can use
    // fromPlainObject() function.
    const astPlain = toPlainObject(ast);
    // const astAgain = fromPlainObject(astPlain);
    
    // Print AST to console
    console.log(inspect(astPlain, { colors: true, depth: null }));

    // You can also generate string from AST (don't use plain object here)
    console.log(generate(ast));
}
```

## References
- CSSTree docs: https://github.com/csstree/csstree/tree/master/docs
- AdGuard *ExtendedCSS*: https://github.com/AdguardTeam/ExtendedCss
- uBlock *"Procedural cosmetic filters"*: https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters
- Adblock Plus *ExtendedCSS*: https://help.adblockplus.org/hc/en-us/articles/360062733293#elemhide-emulation
