import { parse, generate, toPlainObject } from "../../src/syntax";

const parserConfig = {
    context: "selector",
    positions: true,
};

describe(":has-text()", () => {
    test("throws on invalid input", () => {
        expect(() => parse(`:has-text()`, parserConfig)).toThrow();
        expect(() => parse(`:has-text( )`, parserConfig)).toThrow();
        expect(() => parse(`:has-text(  )`, parserConfig)).toThrow();

        expect(() => parse(`:has-text(a`, parserConfig)).toThrow();
        expect(() => parse(`:has-text(a'`, parserConfig)).toThrow();
    });

    test("parses valid input properly", () => {
        // Very simple input
        expect(toPlainObject(parse(`:has-text(aaa)`, parserConfig))).toMatchObject({
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
                    name: "has-text",
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
        expect(toPlainObject(parse(`:has-text(/aaa/)`, parserConfig))).toMatchObject({
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
                    name: "has-text",
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
        expect(toPlainObject(parse(`:has-text(/aaa/i)`, parserConfig))).toMatchObject({
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
                    name: "has-text",
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
        expect(toPlainObject(parse(`:has-text(/aaa\\(\\)/i)`, parserConfig))).toMatchObject({
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
                    name: "has-text",
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
        expect(toPlainObject(parse(`:has-text(aaa'bbb)`, parserConfig))).toMatchObject({
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
                    name: "has-text",
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
        expect(toPlainObject(parse(`:has-text(aaa"bbb)`, parserConfig))).toMatchObject({
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
                    name: "has-text",
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
        expect(generate(parse(`:has-text(aaa)`, parserConfig))).toEqual(`:has-text(aaa)`);
        expect(generate(parse(`:has-text(/aaa/)`, parserConfig))).toEqual(`:has-text(/aaa/)`);
        expect(generate(parse(`:has-text(/aaa/i)`, parserConfig))).toEqual(`:has-text(/aaa/i)`);
        expect(generate(parse(`:has-text(/aaa\\(\\)/i)`, parserConfig))).toEqual(`:has-text(/aaa\\(\\)/i)`);
        expect(generate(parse(`:has-text(aaa'bbb)`, parserConfig))).toEqual(`:has-text(aaa'bbb)`);
        expect(generate(parse(`:has-text(aaa"bbb)`, parserConfig))).toEqual(`:has-text(aaa"bbb)`);
    });
});
