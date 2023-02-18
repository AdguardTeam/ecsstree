import { parse, generate, toPlainObject } from "../../src/syntax";

const parserConfig = {
    context: "selector",
    positions: true,
};

describe(":contains()", () => {
    test("throws on invalid input", () => {
        expect(() => parse(`:-abp-contains()`, parserConfig)).toThrow();
        expect(() => parse(`:-abp-contains( )`, parserConfig)).toThrow();
        expect(() => parse(`:-abp-contains(  )`, parserConfig)).toThrow();

        expect(() => parse(`:-abp-contains(a`, parserConfig)).toThrow();
        expect(() => parse(`:-abp-contains(a'`, parserConfig)).toThrow();
    });

    test("parses valid input properly", () => {
        // Very simple input
        expect(toPlainObject(parse(`:-abp-contains(aaa)`, parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 19,
                    line: 1,
                    column: 20,
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
                            offset: 19,
                            line: 1,
                            column: 20,
                        },
                    },
                    name: "-abp-contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 15,
                                    line: 1,
                                    column: 16,
                                },
                                end: {
                                    offset: 18,
                                    line: 1,
                                    column: 19,
                                },
                            },
                            value: "aaa",
                        },
                    ],
                },
            ],
        });

        // Regular expression
        expect(toPlainObject(parse(`:-abp-contains(/aaa/)`, parserConfig))).toMatchObject({
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
                    name: "-abp-contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 15,
                                    line: 1,
                                    column: 16,
                                },
                                end: {
                                    offset: 20,
                                    line: 1,
                                    column: 21,
                                },
                            },
                            value: "/aaa/",
                        },
                    ],
                },
            ],
        });

        // Regular expression with flags
        expect(toPlainObject(parse(`:-abp-contains(/aaa/i)`, parserConfig))).toMatchObject({
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
                    name: "-abp-contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 15,
                                    line: 1,
                                    column: 16,
                                },
                                end: {
                                    offset: 21,
                                    line: 1,
                                    column: 22,
                                },
                            },
                            value: "/aaa/i",
                        },
                    ],
                },
            ],
        });

        // Regular expression with escaped parentheses
        expect(toPlainObject(parse(`:-abp-contains(/aaa\\(\\)/i)`, parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
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
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
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
                    name: "-abp-contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 15,
                                    line: 1,
                                    column: 16,
                                },
                                end: {
                                    offset: 25,
                                    line: 1,
                                    column: 26,
                                },
                            },
                            value: "/aaa\\(\\)/i",
                        },
                    ],
                },
            ],
        });

        // Single quote mark within the string
        expect(toPlainObject(parse(`:-abp-contains(aaa'bbb)`, parserConfig))).toMatchObject({
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
                    name: "-abp-contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 15,
                                    line: 1,
                                    column: 16,
                                },
                                end: {
                                    offset: 22,
                                    line: 1,
                                    column: 23,
                                },
                            },
                            value: "aaa'bbb",
                        },
                    ],
                },
            ],
        });

        // Double quote mark within the string
        expect(toPlainObject(parse(`:-abp-contains(aaa"bbb)`, parserConfig))).toMatchObject({
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
                    name: "-abp-contains",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 15,
                                    line: 1,
                                    column: 16,
                                },
                                end: {
                                    offset: 22,
                                    line: 1,
                                    column: 23,
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
        expect(generate(parse(`:-abp-contains(aaa)`, parserConfig))).toEqual(`:-abp-contains(aaa)`);
        expect(generate(parse(`:-abp-contains(/aaa/)`, parserConfig))).toEqual(`:-abp-contains(/aaa/)`);
        expect(generate(parse(`:-abp-contains(/aaa/i)`, parserConfig))).toEqual(`:-abp-contains(/aaa/i)`);
        expect(generate(parse(`:-abp-contains(/aaa\\(\\)/i)`, parserConfig))).toEqual(`:-abp-contains(/aaa\\(\\)/i)`);
        expect(generate(parse(`:-abp-contains(aaa'bbb)`, parserConfig))).toEqual(`:-abp-contains(aaa'bbb)`);
        expect(generate(parse(`:-abp-contains(aaa"bbb)`, parserConfig))).toEqual(`:-abp-contains(aaa"bbb)`);
    });
});
