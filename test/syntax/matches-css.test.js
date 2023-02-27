import { parse, generate, toPlainObject } from '../../src/index';

const parserConfig = {
    context: 'selector',
    positions: true,
};

describe(':matches-css()', () => {
    test('throws on invalid input', () => {
        expect(() => parse(':matches-css()', parserConfig)).toThrow();
    });

    test('parses valid input properly', () => {
        // Regular style declaration
        expect(toPlainObject(parse(':matches-css(width:720px)', parserConfig))).toMatchObject({
            type: 'Selector',
            loc: {
                source: '<unknown>',
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 25,
                    line: 1,
                    column: 26,
                },
            },
            children: [
                {
                    type: 'PseudoClassSelector',
                    loc: {
                        source: '<unknown>',
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 25,
                            line: 1,
                            column: 26,
                        },
                    },
                    name: 'matches-css',
                    children: [
                        {
                            type: 'Raw',
                            loc: {
                                source: '<unknown>',
                                start: {
                                    offset: 13,
                                    line: 1,
                                    column: 14,
                                },
                                end: {
                                    offset: 24,
                                    line: 1,
                                    column: 25,
                                },
                            },
                            value: 'width:720px',
                        },
                    ],
                },
            ],
        });

        // Regular style declaration with space
        expect(toPlainObject(parse(':matches-css(width: 720px)', parserConfig))).toMatchObject({
            type: 'Selector',
            loc: {
                source: '<unknown>',
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 26,
                    line: 1,
                    column: 27,
                },
            },
            children: [
                {
                    type: 'PseudoClassSelector',
                    loc: {
                        source: '<unknown>',
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 26,
                            line: 1,
                            column: 27,
                        },
                    },
                    name: 'matches-css',
                    children: [
                        {
                            type: 'Raw',
                            loc: {
                                source: '<unknown>',
                                start: {
                                    offset: 13,
                                    line: 1,
                                    column: 14,
                                },
                                end: {
                                    offset: 25,
                                    line: 1,
                                    column: 26,
                                },
                            },
                            value: 'width: 720px',
                        },
                    ],
                },
            ],
        });

        // RegExp value
        // https://github.com/AdguardTeam/ecsstree/issues/2
        expect(
            toPlainObject(
                parse(
                    ':matches-css(background-image: /^url\\("data:image\\/gif;base64.+/)',
                    parserConfig,
                ),
            ),
        ).toMatchObject({
            type: 'Selector',
            loc: {
                source: '<unknown>',
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 65,
                    line: 1,
                    column: 66,
                },
            },
            children: [
                {
                    type: 'PseudoClassSelector',
                    loc: {
                        source: '<unknown>',
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 65,
                            line: 1,
                            column: 66,
                        },
                    },
                    name: 'matches-css',
                    children: [
                        {
                            type: 'Raw',
                            loc: {
                                source: '<unknown>',
                                start: {
                                    offset: 13,
                                    line: 1,
                                    column: 14,
                                },
                                end: {
                                    offset: 64,
                                    line: 1,
                                    column: 65,
                                },
                            },
                            value: 'background-image: /^url\\("data:image\\/gif;base64.+/',
                        },
                    ],
                },
            ],
        });

        // RegExp value with space before and after the argument
        expect(
            toPlainObject(
                parse(
                    // eslint-disable-next-line max-len
                    '*:matches-css(    background-image: /^url\\("data:image\\/gif;base64.+/    ) + a[href="https://www.example.com/"]',
                    parserConfig,
                ),
            ),
        ).toMatchObject({
            type: 'Selector',
            loc: {
                source: '<unknown>',
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 111,
                    line: 1,
                    column: 112,
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
                            offset: 1,
                            line: 1,
                            column: 2,
                        },
                    },
                    name: '*',
                },
                {
                    type: 'PseudoClassSelector',
                    loc: {
                        source: '<unknown>',
                        start: {
                            offset: 1,
                            line: 1,
                            column: 2,
                        },
                        end: {
                            offset: 74,
                            line: 1,
                            column: 75,
                        },
                    },
                    name: 'matches-css',
                    children: [
                        {
                            type: 'Raw',
                            loc: {
                                source: '<unknown>',
                                start: {
                                    offset: 14,
                                    line: 1,
                                    column: 15,
                                },
                                end: {
                                    offset: 73,
                                    line: 1,
                                    column: 74,
                                },
                            },
                            value: '    background-image: /^url\\("data:image\\/gif;base64.+/    ',
                        },
                    ],
                },
                {
                    type: 'Combinator',
                    loc: {
                        source: '<unknown>',
                        start: {
                            offset: 75,
                            line: 1,
                            column: 76,
                        },
                        end: {
                            offset: 76,
                            line: 1,
                            column: 77,
                        },
                    },
                    name: '+',
                },
                {
                    type: 'TypeSelector',
                    loc: {
                        source: '<unknown>',
                        start: {
                            offset: 77,
                            line: 1,
                            column: 78,
                        },
                        end: {
                            offset: 78,
                            line: 1,
                            column: 79,
                        },
                    },
                    name: 'a',
                },
                {
                    type: 'AttributeSelector',
                    loc: {
                        source: '<unknown>',
                        start: {
                            offset: 78,
                            line: 1,
                            column: 79,
                        },
                        end: {
                            offset: 111,
                            line: 1,
                            column: 112,
                        },
                    },
                    name: {
                        type: 'Identifier',
                        loc: {
                            source: '<unknown>',
                            start: {
                                offset: 79,
                                line: 1,
                                column: 80,
                            },
                            end: {
                                offset: 83,
                                line: 1,
                                column: 84,
                            },
                        },
                        name: 'href',
                    },
                    matcher: '=',
                    value: {
                        type: 'String',
                        loc: {
                            source: '<unknown>',
                            start: {
                                offset: 84,
                                line: 1,
                                column: 85,
                            },
                            end: {
                                offset: 110,
                                line: 1,
                                column: 111,
                            },
                        },
                        value: 'https://www.example.com/',
                    },
                    flags: null,
                },
            ],
        });

        // Function call within the argument (parentheses balanced)
        expect(
            toPlainObject(
                parse(
                    ':matches-css(background-image:url(data:*))',
                    parserConfig,
                ),
            ),
        ).toMatchObject({
            type: 'Selector',
            loc: {
                source: '<unknown>',
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 42,
                    line: 1,
                    column: 43,
                },
            },
            children: [
                {
                    type: 'PseudoClassSelector',
                    loc: {
                        source: '<unknown>',
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 42,
                            line: 1,
                            column: 43,
                        },
                    },
                    name: 'matches-css',
                    children: [
                        {
                            type: 'Raw',
                            loc: {
                                source: '<unknown>',
                                start: {
                                    offset: 13,
                                    line: 1,
                                    column: 14,
                                },
                                end: {
                                    offset: 41,
                                    line: 1,
                                    column: 42,
                                },
                            },
                            value: 'background-image:url(data:*)',
                        },
                    ],
                },
            ],
        });
    });

    test('generates valid input properly', () => {
        expect(generate(parse(':matches-css(width:720px)', parserConfig))).toEqual(':matches-css(width:720px)');
        expect(generate(parse(':matches-css(width: 720px)', parserConfig))).toEqual(':matches-css(width: 720px)');

        expect(
            generate(parse(':matches-css(background-image: /^url\\("data:image\\/gif;base64.+/)', parserConfig)),
        ).toEqual(
            ':matches-css(background-image: /^url\\("data:image\\/gif;base64.+/)',
        );

        expect(
            generate(
                parse(
                    // eslint-disable-next-line max-len
                    '*:matches-css(    background-image: /^url\\("data:image\\/gif;base64.+/    ) + a[href="https://www.example.com/"]',
                    parserConfig,
                ),
            ),
        ).toEqual(
            // eslint-disable-next-line max-len
            '*:matches-css(    background-image: /^url\\("data:image\\/gif;base64.+/    )+a[href="https://www.example.com/"]',
        );

        expect(
            generate(parse(':matches-css(background-image:url(data:*))', parserConfig)),
        ).toEqual(
            ':matches-css(background-image:url(data:*))',
        );
    });
});
