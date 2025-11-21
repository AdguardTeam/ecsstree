import { describe, expect, test } from 'vitest';

import { generate, parse, toPlainObject } from '../../src/index';

const parserConfig = {
    context: 'selector',
    positions: true,
};

describe(':upward()', () => {
    test('throws on invalid input', () => {
        expect(() => parse(':upward($$)', parserConfig)).toThrow();
        expect(() => parse(':upward(.)', parserConfig)).toThrow();
    });

    test('parses valid input properly', () => {
        // Number
        expect(toPlainObject(parse('div:upward(42)', parserConfig))).toStrictEqual({
            type: 'Selector',
            loc: {
                source: '<unknown>',
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 14,
                    line: 1,
                    column: 15,
                },
            },
            children: [
                {
                    type: 'TypeSelector',
                    loc: {
                        source: '<unknown>',
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 3,
                            line: 1,
                            column: 4,
                        },
                    },
                    name: 'div',
                },
                {
                    type: 'PseudoClassSelector',
                    loc: {
                        source: '<unknown>',
                        start: {
                            offset: 3,
                            line: 1,
                            column: 4,
                        },
                        end: {
                            offset: 14,
                            line: 1,
                            column: 15,
                        },
                    },
                    name: 'upward',
                    children: [
                        {
                            type: 'Number',
                            loc: {
                                source: '<unknown>',
                                start: {
                                    offset: 11,
                                    line: 1,
                                    column: 12,
                                },
                                end: {
                                    offset: 13,
                                    line: 1,
                                    column: 14,
                                },
                            },
                            value: '42',
                        },
                    ],
                },
            ],
        });

        // Selector - now wrapped in SelectorList for consistency
        expect(toPlainObject(parse('div:upward(.something + #another)', parserConfig))).toStrictEqual({
            type: 'Selector',
            loc: {
                source: '<unknown>',
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 33,
                    line: 1,
                    column: 34,
                },
            },
            children: [
                {
                    type: 'TypeSelector',
                    loc: {
                        source: '<unknown>',
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 3,
                            line: 1,
                            column: 4,
                        },
                    },
                    name: 'div',
                },
                {
                    type: 'PseudoClassSelector',
                    loc: {
                        source: '<unknown>',
                        start: {
                            offset: 3,
                            line: 1,
                            column: 4,
                        },
                        end: {
                            offset: 33,
                            line: 1,
                            column: 34,
                        },
                    },
                    name: 'upward',
                    children: [
                        {
                            type: 'SelectorList',
                            loc: {
                                source: '<unknown>',
                                start: {
                                    offset: 11,
                                    line: 1,
                                    column: 12,
                                },
                                end: {
                                    offset: 32,
                                    line: 1,
                                    column: 33,
                                },
                            },
                            children: [
                                {
                                    type: 'Selector',
                                    loc: {
                                        source: '<unknown>',
                                        start: {
                                            offset: 11,
                                            line: 1,
                                            column: 12,
                                        },
                                        end: {
                                            offset: 32,
                                            line: 1,
                                            column: 33,
                                        },
                                    },
                                    children: [
                                        {
                                            type: 'ClassSelector',
                                            loc: {
                                                source: '<unknown>',
                                                start: {
                                                    offset: 11,
                                                    line: 1,
                                                    column: 12,
                                                },
                                                end: {
                                                    offset: 21,
                                                    line: 1,
                                                    column: 22,
                                                },
                                            },
                                            name: 'something',
                                        },
                                        {
                                            type: 'Combinator',
                                            loc: {
                                                source: '<unknown>',
                                                start: {
                                                    offset: 22,
                                                    line: 1,
                                                    column: 23,
                                                },
                                                end: {
                                                    offset: 23,
                                                    line: 1,
                                                    column: 24,
                                                },
                                            },
                                            name: '+',
                                        },
                                        {
                                            type: 'IdSelector',
                                            loc: {
                                                source: '<unknown>',
                                                start: {
                                                    offset: 24,
                                                    line: 1,
                                                    column: 25,
                                                },
                                                end: {
                                                    offset: 32,
                                                    line: 1,
                                                    column: 33,
                                                },
                                            },
                                            name: 'another',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        // Selector list with multiple comma-separated selectors
        const selectorListAST = toPlainObject(
            parse(
                '.su-label:upward(.wpb_text_column, .td_block_text_with_title)',
                parserConfig,
            ),
        );
        expect(selectorListAST.type).toBe('Selector');
        expect(selectorListAST.children).toHaveLength(2);

        // Check the :upward() pseudo-class
        const upwardPseudo = selectorListAST.children[1];
        expect(upwardPseudo.type).toBe('PseudoClassSelector');
        expect(upwardPseudo.name).toBe('upward');
        expect(upwardPseudo.children).toHaveLength(1);

        // Check that the child is a SelectorList
        const selectorList = upwardPseudo.children[0];
        expect(selectorList.type).toBe('SelectorList');
        expect(selectorList.children).toHaveLength(2);

        // Check first selector in the list
        expect(selectorList.children[0].type).toBe('Selector');
        expect(selectorList.children[0].children).toHaveLength(1);
        expect(selectorList.children[0].children[0].type).toBe('ClassSelector');
        expect(selectorList.children[0].children[0].name).toBe('wpb_text_column');

        // Check second selector in the list
        expect(selectorList.children[1].type).toBe('Selector');
        expect(selectorList.children[1].children).toHaveLength(1);
        expect(selectorList.children[1].children[0].type).toBe('ClassSelector');
        expect(selectorList.children[1].children[0].name).toBe('td_block_text_with_title');
    });

    test('generates valid input properly', () => {
        expect(generate(parse('div:upward(42)', parserConfig))).toEqual('div:upward(42)');
        expect(generate(parse('div:upward(.something + #another)', parserConfig))).toEqual(
            'div:upward(.something+#another)',
        );
        expect(generate(parse('div:upward(.foo, .bar)', parserConfig)))
            .toEqual('div:upward(.foo,.bar)');
        expect(generate(parse('.su-label:upward(.wpb_text_column, .td_block_text_with_title)', parserConfig)))
            .toEqual('.su-label:upward(.wpb_text_column,.td_block_text_with_title)');
    });

    test('no false positive parsing errors', () => {
        // "Local" parser config for this test
        const localParserConfig = {
            ...parserConfig,
            onParseError: (error) => {
                throw error;
            },
        };

        expect(() => parse('div:upward(0)', localParserConfig)).not.toThrow();
        expect(() => parse('div:upward(42)', localParserConfig)).not.toThrow();
        expect(() => parse('div:upward(.something + #another)', localParserConfig)).not.toThrow();
        expect(
            () => parse(
                'div:upward(div + :-abp-has(> a[href^="https://example.com/"]) + div)',
                localParserConfig,
            ),
        ).not.toThrow();
        // Selector list with multiple comma-separated selectors
        expect(() => parse('div:upward(.foo, .bar)', localParserConfig)).not.toThrow();
        expect(
            () => parse(
                '.su-label:upward(.wpb_text_column, .td_block_text_with_title)',
                localParserConfig,
            ),
        ).not.toThrow();
    });
});
