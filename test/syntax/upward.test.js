import { parse, generate, toPlainObject } from "../../src/index.js";

const parserConfig = {
    context: "selector",
    positions: true,
};

describe(":upward()", () => {
    test("throws on invalid input", () => {
        expect(() => parse(`:upward()`, parserConfig)).toThrow();
        expect(() => parse(`:upward( )`, parserConfig)).toThrow();

        expect(() => parse(`:upward($$)`, parserConfig)).toThrow();
        expect(() => parse(`:upward(.)`, parserConfig)).toThrow();
    });

    test("parses valid input properly", () => {
        // Number
        expect(toPlainObject(parse("div:upward(42)", parserConfig))).toMatchObject({
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
                    type: "TypeSelector",
                    loc: {
                        source: "<unknown>",
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
                    name: "div",
                },
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
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
                    name: "upward",
                    children: [
                        {
                            type: "Number",
                            loc: {
                                source: "<unknown>",
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
                            value: "42",
                        },
                    ],
                },
            ],
        });

        // Selector
        expect(toPlainObject(parse("div:upward(.something + #another)", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
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
                    type: "TypeSelector",
                    loc: {
                        source: "<unknown>",
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
                    name: "div",
                },
                {
                    type: "PseudoClassSelector",
                    loc: {
                        source: "<unknown>",
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
                    name: "upward",
                    children: [
                        {
                            type: "Selector",
                            loc: {
                                source: "<unknown>",
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
                                    type: "ClassSelector",
                                    loc: {
                                        source: "<unknown>",
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
                                    name: "something",
                                },
                                {
                                    type: "Combinator",
                                    loc: {
                                        source: "<unknown>",
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
                                    name: "+",
                                },
                                {
                                    type: "IdSelector",
                                    loc: {
                                        source: "<unknown>",
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
                                    name: "another",
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });

    test("generates valid input properly", () => {
        expect(generate(parse(`div:upward(42)`, parserConfig))).toEqual(`div:upward(42)`);
        expect(generate(parse(`div:upward(.something + #another)`, parserConfig))).toEqual(
            `div:upward(.something+#another)`
        );
    });
});
