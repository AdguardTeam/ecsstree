import { parse, generate, toPlainObject } from "../../src/syntax";

const parserConfig = {
    context: "selector",
    positions: true,
};

describe(":contains()", () => {
    test("throws on invalid input", () => {
        expect(() => parse(`:contains()`, parserConfig)).toThrow();
        expect(() => parse(`:contains( )`, parserConfig)).toThrow();
        expect(() => parse(`:contains(  )`, parserConfig)).toThrow();

        expect(() => parse(`:contains(a`, parserConfig)).toThrow();
        expect(() => parse(`:contains(a'`, parserConfig)).toThrow();
    });

    test("parses valid input properly", () => {
        // Very simple input
        expect(toPlainObject(parse(`:contains(aaa)`, parserConfig))).toMatchObject({
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

        // Regular expression
        expect(toPlainObject(parse(`:contains(/aaa/)`, parserConfig))).toMatchObject({
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
        expect(toPlainObject(parse(`:contains(/aaa/i)`, parserConfig))).toMatchObject({
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

        // Regular expression with escaped parentheses
        expect(toPlainObject(parse(`:contains(/aaa\\(\\)/i)`, parserConfig))).toMatchObject({
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
        expect(toPlainObject(parse(`:contains(aaa'bbb)`, parserConfig))).toMatchObject({
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
        expect(toPlainObject(parse(`:contains(aaa"bbb)`, parserConfig))).toMatchObject({
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
    });

    test("generates valid input properly", () => {
        expect(generate(parse(`:contains(aaa)`, parserConfig))).toEqual(`:contains(aaa)`);
        expect(generate(parse(`:contains(/aaa/)`, parserConfig))).toEqual(`:contains(/aaa/)`);
        expect(generate(parse(`:contains(/aaa/i)`, parserConfig))).toEqual(`:contains(/aaa/i)`);
        expect(generate(parse(`:contains(/aaa\\(\\)/i)`, parserConfig))).toEqual(`:contains(/aaa\\(\\)/i)`);
        expect(generate(parse(`:contains(aaa'bbb)`, parserConfig))).toEqual(`:contains(aaa'bbb)`);
        expect(generate(parse(`:contains(aaa"bbb)`, parserConfig))).toEqual(`:contains(aaa"bbb)`);
    });
});
