// Tests for :contains(), :-abp-contains() and :has-text() pseudo-classes

import { parse, generate, toPlainObject } from "../../src/index.js";

const parserConfig = {
    context: "selector",
    positions: true,
};

describe(":contains()", () => {
    test("throws on invalid input", () => {
        expect(() => parse(":contains()", parserConfig)).toThrow("Empty parameter specified");

        expect(() => parse(":contains(a", parserConfig)).toThrow();
        expect(() => parse(":contains(a'", parserConfig)).toThrow();

        // :-abp-contains alias
        expect(() => parse(":-abp-contains()", parserConfig)).toThrow("Empty parameter specified");

        expect(() => parse(":-abp-contains(a", parserConfig)).toThrow();
        expect(() => parse(":-abp-contains(a'", parserConfig)).toThrow();

        // :has-text alias
        expect(() => parse(":has-text()", parserConfig)).toThrow("Empty parameter specified");

        expect(() => parse(":has-text(a", parserConfig)).toThrow();
        expect(() => parse(":has-text(a'", parserConfig)).toThrow();
    });

    test("parses valid input properly", () => {
        // One whitespace
        expect(toPlainObject(parse(":contains( )", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 12,
                    line: 1,
                    column: 13,
                },
            },
            children: [
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 12,
                            line: 1,
                            column: 13,
                        },
                    },
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 11,
                                    line: 1,
                                    column: 12,
                                },
                            },
                            value: " ",
                        },
                    ],
                },
            ],
        });

        // Two whitespaces
        expect(toPlainObject(parse(":contains(  )", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 13,
                    line: 1,
                    column: 14,
                },
            },
            children: [
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 13,
                            line: 1,
                            column: 14,
                        },
                    },
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 12,
                                    line: 1,
                                    column: 13,
                                },
                            },
                            value: "  ",
                        },
                    ],
                },
            ],
        });

        // Very simple input
        expect(toPlainObject(parse(":contains(aaa)", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
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
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
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
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 13,
                                    line: 1,
                                    column: 14,
                                },
                            },
                            value: "aaa",
                        },
                    ],
                },
            ],
        });

        // Space before input
        expect(toPlainObject(parse(":contains( aaa)", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 15,
                    line: 1,
                    column: 16,
                },
            },
            children: [
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 15,
                            line: 1,
                            column: 16,
                        },
                    },
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 14,
                                    line: 1,
                                    column: 15,
                                },
                            },
                            value: " aaa",
                        },
                    ],
                },
            ],
        });

        // Space after input
        expect(toPlainObject(parse(":contains(aaa )", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 15,
                    line: 1,
                    column: 16,
                },
            },
            children: [
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 15,
                            line: 1,
                            column: 16,
                        },
                    },
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 14,
                                    line: 1,
                                    column: 15,
                                },
                            },
                            value: "aaa ",
                        },
                    ],
                },
            ],
        });

        // Space before and after input
        expect(toPlainObject(parse(":contains( aaa )", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 16,
                    line: 1,
                    column: 17,
                },
            },
            children: [
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 16,
                            line: 1,
                            column: 17,
                        },
                    },
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 15,
                                    line: 1,
                                    column: 16,
                                },
                            },
                            value: " aaa ",
                        },
                    ],
                },
            ],
        });

        // Space before and after input, with space in input
        expect(toPlainObject(parse(":contains(  aaa  bbb  )", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 23,
                    line: 1,
                    column: 24,
                },
            },
            children: [
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 23,
                            line: 1,
                            column: 24,
                        },
                    },
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 22,
                                    line: 1,
                                    column: 23,
                                },
                            },
                            value: "  aaa  bbb  ",
                        },
                    ],
                },
            ],
        });

        // Space in input
        expect(toPlainObject(parse(":contains(aaa bbb ccc)", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 22,
                    line: 1,
                    column: 23,
                },
            },
            children: [
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 22,
                            line: 1,
                            column: 23,
                        },
                    },
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 21,
                                    line: 1,
                                    column: 22,
                                },
                            },
                            value: "aaa bbb ccc",
                        },
                    ],
                },
            ],
        });

        // Parenthesis in input
        expect(toPlainObject(parse(":contains((aaa))", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 16,
                    line: 1,
                    column: 17,
                },
            },
            children: [
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 16,
                            line: 1,
                            column: 17,
                        },
                    },
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 15,
                                    line: 1,
                                    column: 16,
                                },
                            },
                            value: "(aaa)",
                        },
                    ],
                },
            ],
        });

        // Parenthesis in input, but a bit more complex
        expect(toPlainObject(parse(":contains((aaa)(bbb)\\)\\()", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
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
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
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
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 24,
                                    line: 1,
                                    column: 25,
                                },
                            },
                            value: "(aaa)(bbb)\\)\\(",
                        },
                    ],
                },
            ],
        });

        // Regular expression
        expect(toPlainObject(parse(":contains(/aaa/)", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 16,
                    line: 1,
                    column: 17,
                },
            },
            children: [
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 16,
                            line: 1,
                            column: 17,
                        },
                    },
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 15,
                                    line: 1,
                                    column: 16,
                                },
                            },
                            value: "/aaa/",
                        },
                    ],
                },
            ],
        });

        // Regular expression with flags
        expect(toPlainObject(parse(":contains(/aaa/i)", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 17,
                    line: 1,
                    column: 18,
                },
            },
            children: [
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 17,
                            line: 1,
                            column: 18,
                        },
                    },
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 16,
                                    line: 1,
                                    column: 17,
                                },
                            },
                            value: "/aaa/i",
                        },
                    ],
                },
            ],
        });

        // Regular expression with parentheses
        expect(toPlainObject(parse(":contains(/^(a|b){3,}$/)", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 24,
                    line: 1,
                    column: 25,
                },
            },
            children: [
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 24,
                            line: 1,
                            column: 25,
                        },
                    },
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 23,
                                    line: 1,
                                    column: 24,
                                },
                            },
                            value: "/^(a|b){3,}$/",
                        },
                    ],
                },
            ],
        });

        // Regular expression with escaped parentheses
        expect(toPlainObject(parse(":contains(/aaa\\(\\)/i)", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 21,
                    line: 1,
                    column: 22,
                },
            },
            children: [
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 21,
                            line: 1,
                            column: 22,
                        },
                    },
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 20,
                                    line: 1,
                                    column: 21,
                                },
                            },
                            value: "/aaa\\(\\)/i",
                        },
                    ],
                },
            ],
        });

        // Single quote mark within the string
        expect(toPlainObject(parse(":contains(aaa'bbb)", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 18,
                    line: 1,
                    column: 19,
                },
            },
            children: [
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 18,
                            line: 1,
                            column: 19,
                        },
                    },
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 17,
                                    line: 1,
                                    column: 18,
                                },
                            },
                            value: "aaa'bbb",
                        },
                    ],
                },
            ],
        });

        // Double quote mark within the string
        expect(toPlainObject(parse(':contains(aaa"bbb)', parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 18,
                    line: 1,
                    column: 19,
                },
            },
            children: [
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 18,
                            line: 1,
                            column: 19,
                        },
                    },
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 17,
                                    line: 1,
                                    column: 18,
                                },
                            },
                            value: 'aaa"bbb',
                        },
                    ],
                },
            ],
        });

        // Functions
        expect(toPlainObject(parse(":contains(function(another('')))", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 32,
                    line: 1,
                    column: 33,
                },
            },
            children: [
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
                        start: {
                            offset: 0,
                            line: 1,
                            column: 1,
                        },
                        end: {
                            offset: 32,
                            line: 1,
                            column: 33,
                        },
                    },
                    name: "contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 31,
                                    line: 1,
                                    column: 32,
                                },
                            },
                            value: "function(another(''))",
                        },
                    ],
                },
            ],
        });
    });

    test("generates valid input properly", () => {
        expect(generate(parse(":contains( )", parserConfig))).toEqual(":contains( )");
        expect(generate(parse(":contains(  )", parserConfig))).toEqual(":contains(  )");

        expect(generate(parse(":contains(aaa)", parserConfig))).toEqual(":contains(aaa)");
        expect(generate(parse(":contains( aaa)", parserConfig))).toEqual(":contains( aaa)");
        expect(generate(parse(":contains(aaa )", parserConfig))).toEqual(":contains(aaa )");
        expect(generate(parse(":contains( aaa )", parserConfig))).toEqual(":contains( aaa )");
        expect(generate(parse(":contains( aaa bbb )", parserConfig))).toEqual(":contains( aaa bbb )");
        expect(generate(parse(":contains( aaa  bbb )", parserConfig))).toEqual(":contains( aaa  bbb )");
        expect(generate(parse(":contains( aaa  bbb  ccc )", parserConfig))).toEqual(":contains( aaa  bbb  ccc )");

        expect(generate(parse(":contains((aaa))", parserConfig))).toEqual(":contains((aaa))");
        // eslint-disable-next-line max-len
        // TODO: "(aaa)(bbb)\\)\\("" is generated as "(aaa)(bbb) \\)\\(", but it should be "(aaa)(bbb)\\)\\(" - CSSTree related issue
        // expect(generate(parse(`:contains((aaa)(bbb)\\)\\()`, parserConfig))).toEqual(`:contains((aaa)(bbb)\\)\\()`);

        expect(generate(parse(":contains(/aaa/)", parserConfig))).toEqual(":contains(/aaa/)");
        expect(generate(parse(":contains(/aaa/i)", parserConfig))).toEqual(":contains(/aaa/i)");
        expect(generate(parse(":contains(/^(a|b){3,}$/)", parserConfig))).toEqual(":contains(/^(a|b){3,}$/)");
        expect(generate(parse(":contains(/aaa\\(\\)/i)", parserConfig))).toEqual(":contains(/aaa\\(\\)/i)");

        expect(generate(parse(":contains(aaa'bbb)", parserConfig))).toEqual(":contains(aaa'bbb)");
        expect(generate(parse(':contains(aaa"bbb)', parserConfig))).toEqual(':contains(aaa"bbb)');

        // :-abp-contains alias
        expect(generate(parse(":-abp-contains( )", parserConfig))).toEqual(":-abp-contains( )");
        expect(generate(parse(":-abp-contains(  )", parserConfig))).toEqual(":-abp-contains(  )");

        expect(generate(parse(":-abp-contains(aaa)", parserConfig))).toEqual(":-abp-contains(aaa)");
        expect(generate(parse(":-abp-contains( aaa)", parserConfig))).toEqual(":-abp-contains( aaa)");
        expect(generate(parse(":-abp-contains(aaa )", parserConfig))).toEqual(":-abp-contains(aaa )");
        expect(generate(parse(":-abp-contains( aaa )", parserConfig))).toEqual(":-abp-contains( aaa )");
        expect(generate(parse(":-abp-contains( aaa bbb )", parserConfig))).toEqual(":-abp-contains( aaa bbb )");
        expect(generate(parse(":-abp-contains( aaa  bbb )", parserConfig))).toEqual(":-abp-contains( aaa  bbb )");
        expect(generate(parse(":-abp-contains( aaa  bbb  ccc )", parserConfig))).toEqual(
            ":-abp-contains( aaa  bbb  ccc )"
        );

        expect(generate(parse(":-abp-contains((aaa))", parserConfig))).toEqual(":-abp-contains((aaa))");

        expect(generate(parse(":-abp-contains(/aaa/)", parserConfig))).toEqual(":-abp-contains(/aaa/)");
        expect(generate(parse(":-abp-contains(/aaa/i)", parserConfig))).toEqual(":-abp-contains(/aaa/i)");
        expect(generate(parse(":-abp-contains(/^(a|b){3,}$/)", parserConfig))).toEqual(":-abp-contains(/^(a|b){3,}$/)");
        expect(generate(parse(":-abp-contains(/aaa\\(\\)/i)", parserConfig))).toEqual(":-abp-contains(/aaa\\(\\)/i)");

        expect(generate(parse(":-abp-contains(aaa'bbb)", parserConfig))).toEqual(":-abp-contains(aaa'bbb)");
        expect(generate(parse(':-abp-contains(aaa"bbb)', parserConfig))).toEqual(':-abp-contains(aaa"bbb)');

        // :has-text alias
        expect(generate(parse(":has-text( )", parserConfig))).toEqual(":has-text( )");
        expect(generate(parse(":has-text(  )", parserConfig))).toEqual(":has-text(  )");

        expect(generate(parse(":has-text(aaa)", parserConfig))).toEqual(":has-text(aaa)");
        expect(generate(parse(":has-text( aaa)", parserConfig))).toEqual(":has-text( aaa)");
        expect(generate(parse(":has-text(aaa )", parserConfig))).toEqual(":has-text(aaa )");
        expect(generate(parse(":has-text( aaa )", parserConfig))).toEqual(":has-text( aaa )");
        expect(generate(parse(":has-text( aaa bbb )", parserConfig))).toEqual(":has-text( aaa bbb )");
        expect(generate(parse(":has-text( aaa  bbb )", parserConfig))).toEqual(":has-text( aaa  bbb )");
        expect(generate(parse(":has-text( aaa  bbb  ccc )", parserConfig))).toEqual(":has-text( aaa  bbb  ccc )");

        expect(generate(parse(":has-text((aaa))", parserConfig))).toEqual(":has-text((aaa))");

        expect(generate(parse(":has-text(/aaa/)", parserConfig))).toEqual(":has-text(/aaa/)");
        expect(generate(parse(":has-text(/aaa/i)", parserConfig))).toEqual(":has-text(/aaa/i)");
        expect(generate(parse(":has-text(/^(a|b){3,}$/)", parserConfig))).toEqual(":has-text(/^(a|b){3,}$/)");
        expect(generate(parse(":has-text(/aaa\\(\\)/i)", parserConfig))).toEqual(":has-text(/aaa\\(\\)/i)");

        expect(generate(parse(":has-text(aaa'bbb)", parserConfig))).toEqual(":has-text(aaa'bbb)");
        expect(generate(parse(':has-text(aaa"bbb)', parserConfig))).toEqual(':has-text(aaa"bbb)');
    });
});
