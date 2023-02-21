import { parse, generate, toPlainObject } from '../../src/index';

const parserConfig = {
    context: 'selector',
    positions: true,
};

describe(':if-not()', () => {
    test('throws on invalid input', () => {
        expect(() => parse(':if-not()', parserConfig)).toThrow();
        expect(() => parse(':if-not( )', parserConfig)).toThrow();

        expect(() => parse(':if-not($$)', parserConfig)).toThrow();
        expect(() => parse(':if-not(.)', parserConfig)).toThrow();
    });

    test('parses valid input properly', () => {
        expect(toPlainObject(parse('div:if-not(.something + #another)', parserConfig))).toMatchObject({
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
                    name: 'if-not',
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
        });
    });

    test('generates valid input properly', () => {
        expect(generate(parse('div:if-not(.something + #another)', parserConfig))).toEqual(
            'div:if-not(.something+#another)',
        );
    });
});
