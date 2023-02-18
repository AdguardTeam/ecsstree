import { parse, generate, toPlainObject } from "../../src/syntax";

const parserConfig = {
    context: "selector",
    positions: true,
};

describe(":-abp-has()", () => {
    test("throws on invalid input", () => {
        expect(() => parse(`:-abp-has()`, parserConfig)).toThrow();
        expect(() => parse(`:-abp-has( )`, parserConfig)).toThrow();

        expect(() => parse(`:-abp-has($$)`, parserConfig)).toThrow();
        expect(() => parse(`:-abp-has(.)`, parserConfig)).toThrow();
    });

    test("parses valid input properly", () => {
        expect(toPlainObject(parse(`:-abp-has(div)`, parserConfig))).toMatchObject({
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
                    name: "-abp-has",
                    children: [
                        {
                            type: "Selector",
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
                            children: [
                                {
                                    type: "TypeSelector",
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
                                    name: "div",
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        expect(toPlainObject(parse(`:-abp-has(div:has(> a[href*="tracker"]))`, parserConfig))).toMatchObject({
            type: "Selector",
            loc: {
                source: "<unknown>",
                start: {
                    offset: 0,
                    line: 1,
                    column: 1,
                },
                end: {
                    offset: 40,
                    line: 1,
                    column: 41,
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
                            offset: 40,
                            line: 1,
                            column: 41,
                        },
                    },
                    name: "-abp-has",
                    children: [
                        {
                            type: "Selector",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 39,
                                    line: 1,
                                    column: 40,
                                },
                            },
                            children: [
                                {
                                    type: "TypeSelector",
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
                                    name: "div",
                                },
                                {
                                    type: "PseudoClassSelector",
                                    loc: {
                                        source: "<unknown>",
                                        start: {
                                            offset: 13,
                                            line: 1,
                                            column: 14,
                                        },
                                        end: {
                                            offset: 39,
                                            line: 1,
                                            column: 40,
                                        },
                                    },
                                    name: "has",
                                    children: [
                                        {
                                            type: "SelectorList",
                                            loc: {
                                                source: "<unknown>",
                                                start: {
                                                    offset: 18,
                                                    line: 1,
                                                    column: 19,
                                                },
                                                end: {
                                                    offset: 38,
                                                    line: 1,
                                                    column: 39,
                                                },
                                            },
                                            children: [
                                                {
                                                    type: "Selector",
                                                    loc: {
                                                        source: "<unknown>",
                                                        start: {
                                                            offset: 18,
                                                            line: 1,
                                                            column: 19,
                                                        },
                                                        end: {
                                                            offset: 38,
                                                            line: 1,
                                                            column: 39,
                                                        },
                                                    },
                                                    children: [
                                                        {
                                                            type: "Combinator",
                                                            loc: {
                                                                source: "<unknown>",
                                                                start: {
                                                                    offset: 18,
                                                                    line: 1,
                                                                    column: 19,
                                                                },
                                                                end: {
                                                                    offset: 19,
                                                                    line: 1,
                                                                    column: 20,
                                                                },
                                                            },
                                                            name: ">",
                                                        },
                                                        {
                                                            type: "TypeSelector",
                                                            loc: {
                                                                source: "<unknown>",
                                                                start: {
                                                                    offset: 20,
                                                                    line: 1,
                                                                    column: 21,
                                                                },
                                                                end: {
                                                                    offset: 21,
                                                                    line: 1,
                                                                    column: 22,
                                                                },
                                                            },
                                                            name: "a",
                                                        },
                                                        {
                                                            type: "AttributeSelector",
                                                            loc: {
                                                                source: "<unknown>",
                                                                start: {
                                                                    offset: 21,
                                                                    line: 1,
                                                                    column: 22,
                                                                },
                                                                end: {
                                                                    offset: 38,
                                                                    line: 1,
                                                                    column: 39,
                                                                },
                                                            },
                                                            name: {
                                                                type: "Identifier",
                                                                loc: {
                                                                    source: "<unknown>",
                                                                    start: {
                                                                        offset: 22,
                                                                        line: 1,
                                                                        column: 23,
                                                                    },
                                                                    end: {
                                                                        offset: 26,
                                                                        line: 1,
                                                                        column: 27,
                                                                    },
                                                                },
                                                                name: "href",
                                                            },
                                                            matcher: "*=",
                                                            value: {
                                                                type: "String",
                                                                loc: {
                                                                    source: "<unknown>",
                                                                    start: {
                                                                        offset: 28,
                                                                        line: 1,
                                                                        column: 29,
                                                                    },
                                                                    end: {
                                                                        offset: 37,
                                                                        line: 1,
                                                                        column: 38,
                                                                    },
                                                                },
                                                                value: "tracker",
                                                            },
                                                            flags: null,
                                                        },
                                                    ],
                                                },
                                            ],
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
        expect(generate(parse(`:-abp-has(div)`, parserConfig))).toEqual(`:-abp-has(div)`);
        expect(generate(parse(`:-abp-has(div:has(> a[href*="tracker"]))`, parserConfig))).toEqual(
            `:-abp-has(div:has(>a[href*="tracker"]))`
        );
        expect(generate(parse(`:-abp-has(div:has(> a[href*='tracker']))`, parserConfig))).toEqual(
            `:-abp-has(div:has(>a[href*="tracker"]))`
        );
    });
});
