import { parse, generate, toPlainObject } from "../../src/syntax";

const parserConfig = {
    context: "selector",
    positions: true,
};

describe(":nth-ancestor()", () => {
    test("throws on invalid input", () => {
        expect(() => parse(`:nth-ancestor()`, parserConfig)).toThrow();
        expect(() => parse(`:nth-ancestor( )`, parserConfig)).toThrow();

        expect(() => parse(`:nth-ancestor($$)`, parserConfig)).toThrow();
        expect(() => parse(`:nth-ancestor(.)`, parserConfig)).toThrow();

        // Selector
        expect(() => parse(`:nth-ancestor(div)`, parserConfig)).toThrow();
        expect(() => parse(`:nth-ancestor(div + section[class^="something"])`, parserConfig)).toThrow();
    });

    test("parses valid input properly", () => {
        // Number
        expect(toPlainObject(parse(`div:nth-ancestor(42)`, parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 20,
                    line: 1,
                    column: 21,
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
                            offset: 20,
                            line: 1,
                            column: 21,
                        },
                    },
                    name: "nth-ancestor",
                    children: [
                        {
                            type: "Number",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 17,
                                    line: 1,
                                    column: 18,
                                },
                                end: {
                                    offset: 19,
                                    line: 1,
                                    column: 20,
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
        expect(generate(parse(`div:nth-ancestor(42)`, parserConfig))).toEqual(`div:nth-ancestor(42)`);
    });
});
