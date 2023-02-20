import { parse, generate, toPlainObject } from "../../src/index.js";

const parserConfig = {
    context: "selector",
    positions: true,
};

describe(":min-text-length()", () => {
    test("throws on invalid input", () => {
        expect(() => parse(`:min-text-length()`, parserConfig)).toThrow();
        expect(() => parse(`:min-text-length( )`, parserConfig)).toThrow();

        expect(() => parse(`:min-text-length($$)`, parserConfig)).toThrow();
        expect(() => parse(`:min-text-length(.)`, parserConfig)).toThrow();

        // Selector
        expect(() => parse(`:min-text-length(div)`, parserConfig)).toThrow();
        expect(() => parse(`:min-text-length(div + section[class^="something"])`, parserConfig)).toThrow();
    });

    test("parses valid input properly", () => {
        // Number
        expect(toPlainObject(parse(`div:min-text-length(42)`, parserConfig))).toMatchObject({
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
                            offset: 23,
                            line: 1,
                            column: 24,
                        },
                    },
                    name: "min-text-length",
                    children: [
                        {
                            type: "Number",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 20,
                                    line: 1,
                                    column: 21,
                                },
                                end: {
                                    offset: 22,
                                    line: 1,
                                    column: 23,
                                },
                            },
                            value: "42",
                        },
                    ],
                },
            ],
        });
    });

    test("generates valid input properly", () => {
        expect(generate(parse(`div:min-text-length(42)`, parserConfig))).toEqual(`div:min-text-length(42)`);
    });
});
