import { parse, generate, toPlainObject } from "../../src/index.js";

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
        // Simple selector
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
                            type: "SelectorList",
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
                },
            ],
        });

        // Complex selector
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
                            type: "SelectorList",
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
                },
            ],
        });

        // Simple selector list
        expect(toPlainObject(parse(`:-abp-has(div, div)`, parserConfig))).toMatchObject({
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
                    name: "-abp-has",
                    children: [
                        {
                            type: "SelectorList",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 18,
                                    line: 1,
                                    column: 19,
                                },
                            },
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
                                {
                                    type: "Selector",
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
                                    children: [
                                        {
                                            type: "TypeSelector",
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
                                            name: "div",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        // Complex selector list
        expect(
            toPlainObject(parse(`:-abp-has(div, div:has(> a[href*="tracker"]) + section:contains(ads))`, parserConfig))
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
                    offset: 69,
                    line: 1,
                    column: 70,
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
                            offset: 69,
                            line: 1,
                            column: 70,
                        },
                    },
                    name: "-abp-has",
                    children: [
                        {
                            type: "SelectorList",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 68,
                                    line: 1,
                                    column: 69,
                                },
                            },
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
                                {
                                    type: "Selector",
                                    loc: {
                                        source: "<unknown>",
                                        start: {
                                            offset: 15,
                                            line: 1,
                                            column: 16,
                                        },
                                        end: {
                                            offset: 68,
                                            line: 1,
                                            column: 69,
                                        },
                                    },
                                    children: [
                                        {
                                            type: "TypeSelector",
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
                                            name: "div",
                                        },
                                        {
                                            type: "PseudoClassSelector",
                                            loc: {
                                                source: "<unknown>",
                                                start: {
                                                    offset: 18,
                                                    line: 1,
                                                    column: 19,
                                                },
                                                end: {
                                                    offset: 44,
                                                    line: 1,
                                                    column: 45,
                                                },
                                            },
                                            name: "has",
                                            children: [
                                                {
                                                    type: "SelectorList",
                                                    loc: {
                                                        source: "<unknown>",
                                                        start: {
                                                            offset: 23,
                                                            line: 1,
                                                            column: 24,
                                                        },
                                                        end: {
                                                            offset: 43,
                                                            line: 1,
                                                            column: 44,
                                                        },
                                                    },
                                                    children: [
                                                        {
                                                            type: "Selector",
                                                            loc: {
                                                                source: "<unknown>",
                                                                start: {
                                                                    offset: 23,
                                                                    line: 1,
                                                                    column: 24,
                                                                },
                                                                end: {
                                                                    offset: 43,
                                                                    line: 1,
                                                                    column: 44,
                                                                },
                                                            },
                                                            children: [
                                                                {
                                                                    type: "Combinator",
                                                                    loc: {
                                                                        source: "<unknown>",
                                                                        start: {
                                                                            offset: 23,
                                                                            line: 1,
                                                                            column: 24,
                                                                        },
                                                                        end: {
                                                                            offset: 24,
                                                                            line: 1,
                                                                            column: 25,
                                                                        },
                                                                    },
                                                                    name: ">",
                                                                },
                                                                {
                                                                    type: "TypeSelector",
                                                                    loc: {
                                                                        source: "<unknown>",
                                                                        start: {
                                                                            offset: 25,
                                                                            line: 1,
                                                                            column: 26,
                                                                        },
                                                                        end: {
                                                                            offset: 26,
                                                                            line: 1,
                                                                            column: 27,
                                                                        },
                                                                    },
                                                                    name: "a",
                                                                },
                                                                {
                                                                    type: "AttributeSelector",
                                                                    loc: {
                                                                        source: "<unknown>",
                                                                        start: {
                                                                            offset: 26,
                                                                            line: 1,
                                                                            column: 27,
                                                                        },
                                                                        end: {
                                                                            offset: 43,
                                                                            line: 1,
                                                                            column: 44,
                                                                        },
                                                                    },
                                                                    name: {
                                                                        type: "Identifier",
                                                                        loc: {
                                                                            source: "<unknown>",
                                                                            start: {
                                                                                offset: 27,
                                                                                line: 1,
                                                                                column: 28,
                                                                            },
                                                                            end: {
                                                                                offset: 31,
                                                                                line: 1,
                                                                                column: 32,
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
                                                                                offset: 33,
                                                                                line: 1,
                                                                                column: 34,
                                                                            },
                                                                            end: {
                                                                                offset: 42,
                                                                                line: 1,
                                                                                column: 43,
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
                                        {
                                            type: "Combinator",
                                            loc: {
                                                source: "<unknown>",
                                                start: {
                                                    offset: 45,
                                                    line: 1,
                                                    column: 46,
                                                },
                                                end: {
                                                    offset: 46,
                                                    line: 1,
                                                    column: 47,
                                                },
                                            },
                                            name: "+",
                                        },
                                        {
                                            type: "TypeSelector",
                                            loc: {
                                                source: "<unknown>",
                                                start: {
                                                    offset: 47,
                                                    line: 1,
                                                    column: 48,
                                                },
                                                end: {
                                                    offset: 54,
                                                    line: 1,
                                                    column: 55,
                                                },
                                            },
                                            name: "section",
                                        },
                                        {
                                            type: "PseudoClassSelector",
                                            loc: {
                                                source: "<unknown>",
                                                start: {
                                                    offset: 54,
                                                    line: 1,
                                                    column: 55,
                                                },
                                                end: {
                                                    offset: 68,
                                                    line: 1,
                                                    column: 69,
                                                },
                                            },
                                            name: "contains",
                                            children: [
                                                {
                                                    type: "Raw",
                                                    loc: {
                                                        source: "<unknown>",
                                                        start: {
                                                            offset: 64,
                                                            line: 1,
                                                            column: 65,
                                                        },
                                                        end: {
                                                            offset: 67,
                                                            line: 1,
                                                            column: 68,
                                                        },
                                                    },
                                                    value: "ads",
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

        // Selector lists
        expect(generate(parse(`:-abp-has(div, div)`, parserConfig))).toEqual(`:-abp-has(div,div)`);
        expect(
            generate(parse(`:-abp-has(div, div:has(> a[href*="tracker"]) + section:contains(ads))`, parserConfig))
        ).toEqual(`:-abp-has(div,div:has(>a[href*="tracker"])+section:contains(ads))`);
    });
});
