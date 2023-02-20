import { parse, generate, toPlainObject } from "../../src/index.js";

const parserConfig = {
    context: "selector",
    positions: true,
};

describe(":matches-media()", () => {
    test("throws on invalid input", () => {
        expect(() => parse(":matches-media()", parserConfig)).toThrow();
        expect(() => parse(":matches-media( )", parserConfig)).toThrow();

        expect(() => parse(":matches-media($$)", parserConfig)).toThrow();
        expect(() => parse(":matches-media(.)", parserConfig)).toThrow();
    });

    test("parses valid input properly", () => {
        // Simple media query
        expect(toPlainObject(parse("div:matches-media((min-width: 720px))", parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 37,
                    line: 1,
                    column: 38,
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
                            offset: 37,
                            line: 1,
                            column: 38,
                        },
                    },
                    name: "matches-media",
                    children: [
                        {
                            type: "MediaQueryList",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 18,
                                    line: 1,
                                    column: 19,
                                },
                                end: {
                                    offset: 36,
                                    line: 1,
                                    column: 37,
                                },
                            },
                            children: [
                                {
                                    type: "MediaQuery",
                                    loc: {
                                        source: "<unknown>",
                                        start: {
                                            offset: 18,
                                            line: 1,
                                            column: 19,
                                        },
                                        end: {
                                            offset: 36,
                                            line: 1,
                                            column: 37,
                                        },
                                    },
                                    children: [
                                        {
                                            type: "MediaFeature",
                                            loc: {
                                                source: "<unknown>",
                                                start: {
                                                    offset: 18,
                                                    line: 1,
                                                    column: 19,
                                                },
                                                end: {
                                                    offset: 36,
                                                    line: 1,
                                                    column: 37,
                                                },
                                            },
                                            name: "min-width",
                                            value: {
                                                type: "Dimension",
                                                loc: {
                                                    source: "<unknown>",
                                                    start: {
                                                        offset: 30,
                                                        line: 1,
                                                        column: 31,
                                                    },
                                                    end: {
                                                        offset: 35,
                                                        line: 1,
                                                        column: 36,
                                                    },
                                                },
                                                value: "720",
                                                unit: "px",
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        // Complex media query
        expect(
            toPlainObject(
                parse("div:matches-media((min-height: 680px), screen and (orientation: portrait))", parserConfig)
            )
        ).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 74,
                    line: 1,
                    column: 75,
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
                            offset: 74,
                            line: 1,
                            column: 75,
                        },
                    },
                    name: "matches-media",
                    children: [
                        {
                            type: "MediaQueryList",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 18,
                                    line: 1,
                                    column: 19,
                                },
                                end: {
                                    offset: 73,
                                    line: 1,
                                    column: 74,
                                },
                            },
                            children: [
                                {
                                    type: "MediaQuery",
                                    loc: {
                                        source: "<unknown>",
                                        start: {
                                            offset: 18,
                                            line: 1,
                                            column: 19,
                                        },
                                        end: {
                                            offset: 37,
                                            line: 1,
                                            column: 38,
                                        },
                                    },
                                    children: [
                                        {
                                            type: "MediaFeature",
                                            loc: {
                                                source: "<unknown>",
                                                start: {
                                                    offset: 18,
                                                    line: 1,
                                                    column: 19,
                                                },
                                                end: {
                                                    offset: 37,
                                                    line: 1,
                                                    column: 38,
                                                },
                                            },
                                            name: "min-height",
                                            value: {
                                                type: "Dimension",
                                                loc: {
                                                    source: "<unknown>",
                                                    start: {
                                                        offset: 31,
                                                        line: 1,
                                                        column: 32,
                                                    },
                                                    end: {
                                                        offset: 36,
                                                        line: 1,
                                                        column: 37,
                                                    },
                                                },
                                                value: "680",
                                                unit: "px",
                                            },
                                        },
                                    ],
                                },
                                {
                                    type: "MediaQuery",
                                    loc: {
                                        source: "<unknown>",
                                        start: {
                                            offset: 39,
                                            line: 1,
                                            column: 40,
                                        },
                                        end: {
                                            offset: 73,
                                            line: 1,
                                            column: 74,
                                        },
                                    },
                                    children: [
                                        {
                                            type: "Identifier",
                                            loc: {
                                                source: "<unknown>",
                                                start: {
                                                    offset: 39,
                                                    line: 1,
                                                    column: 40,
                                                },
                                                end: {
                                                    offset: 45,
                                                    line: 1,
                                                    column: 46,
                                                },
                                            },
                                            name: "screen",
                                        },
                                        {
                                            type: "Identifier",
                                            loc: {
                                                source: "<unknown>",
                                                start: {
                                                    offset: 46,
                                                    line: 1,
                                                    column: 47,
                                                },
                                                end: {
                                                    offset: 49,
                                                    line: 1,
                                                    column: 50,
                                                },
                                            },
                                            name: "and",
                                        },
                                        {
                                            type: "MediaFeature",
                                            loc: {
                                                source: "<unknown>",
                                                start: {
                                                    offset: 50,
                                                    line: 1,
                                                    column: 51,
                                                },
                                                end: {
                                                    offset: 73,
                                                    line: 1,
                                                    column: 74,
                                                },
                                            },
                                            name: "orientation",
                                            value: {
                                                type: "Identifier",
                                                loc: {
                                                    source: "<unknown>",
                                                    start: {
                                                        offset: 64,
                                                        line: 1,
                                                        column: 65,
                                                    },
                                                    end: {
                                                        offset: 72,
                                                        line: 1,
                                                        column: 73,
                                                    },
                                                },
                                                name: "portrait",
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });

    test("generates valid input properly", () => {
        expect(generate(parse("div:matches-media((min-width: 720px))", parserConfig))).toEqual(
            "div:matches-media((min-width:720px))"
        );
        expect(
            generate(parse("div:matches-media((min-height: 680px), screen and (orientation: portrait))", parserConfig))
        ).toEqual("div:matches-media((min-height:680px),screen and (orientation:portrait))");
    });
});
