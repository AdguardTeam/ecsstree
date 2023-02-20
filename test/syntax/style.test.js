import { parse, generate, toPlainObject } from "../../src/index.js";

const parserConfig = {
    context: "selector",
    positions: true,
};

describe(":style()", () => {
    test("throws on invalid input", () => {
        // Empty declaration
        expect(() => parse("div:style()", parserConfig)).toThrow();
        expect(() => parse("div:style( )", parserConfig)).toThrow();
    });

    test("parses valid input properly", () => {
        // Simple style
        expect(toPlainObject(parse("div:style(padding: 0)", parserConfig))).toMatchObject({
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
                            offset: 21,
                            line: 1,
                            column: 22,
                        },
                    },
                    name: "style",
                    children: [
                        {
                            type: "DeclarationList",
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
                            children: [
                                {
                                    type: "Declaration",
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
                                    important: false,
                                    property: "padding",
                                    value: {
                                        type: "Value",
                                        loc: {
                                            source: "<unknown>",
                                            start: {
                                                offset: 19,
                                                line: 1,
                                                column: 20,
                                            },
                                            end: {
                                                offset: 20,
                                                line: 1,
                                                column: 21,
                                            },
                                        },
                                        children: [
                                            {
                                                type: "Number",
                                                loc: {
                                                    source: "<unknown>",
                                                    start: {
                                                        offset: 19,
                                                        line: 1,
                                                        column: 20,
                                                    },
                                                    end: {
                                                        offset: 20,
                                                        line: 1,
                                                        column: 21,
                                                    },
                                                },
                                                value: "0",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        // Semicolon at the end
        expect(toPlainObject(parse("div:style(padding: 0;)", parserConfig))).toMatchObject({
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
                            offset: 22,
                            line: 1,
                            column: 23,
                        },
                    },
                    name: "style",
                    children: [
                        {
                            type: "DeclarationList",
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
                            children: [
                                {
                                    type: "Declaration",
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
                                    important: false,
                                    property: "padding",
                                    value: {
                                        type: "Value",
                                        loc: {
                                            source: "<unknown>",
                                            start: {
                                                offset: 19,
                                                line: 1,
                                                column: 20,
                                            },
                                            end: {
                                                offset: 20,
                                                line: 1,
                                                column: 21,
                                            },
                                        },
                                        children: [
                                            {
                                                type: "Number",
                                                loc: {
                                                    source: "<unknown>",
                                                    start: {
                                                        offset: 19,
                                                        line: 1,
                                                        column: 20,
                                                    },
                                                    end: {
                                                        offset: 20,
                                                        line: 1,
                                                        column: 21,
                                                    },
                                                },
                                                value: "0",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        // Important style
        expect(toPlainObject(parse("div:style(padding: 0 !important)", parserConfig))).toMatchObject({
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
                            offset: 32,
                            line: 1,
                            column: 33,
                        },
                    },
                    name: "style",
                    children: [
                        {
                            type: "DeclarationList",
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
                            children: [
                                {
                                    type: "Declaration",
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
                                    important: true,
                                    property: "padding",
                                    value: {
                                        type: "Value",
                                        loc: {
                                            source: "<unknown>",
                                            start: {
                                                offset: 19,
                                                line: 1,
                                                column: 20,
                                            },
                                            end: {
                                                offset: 21,
                                                line: 1,
                                                column: 22,
                                            },
                                        },
                                        children: [
                                            {
                                                type: "Number",
                                                loc: {
                                                    source: "<unknown>",
                                                    start: {
                                                        offset: 19,
                                                        line: 1,
                                                        column: 20,
                                                    },
                                                    end: {
                                                        offset: 20,
                                                        line: 1,
                                                        column: 21,
                                                    },
                                                },
                                                value: "0",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        // Complex style
        expect(
            toPlainObject(parse("div:style(padding: 0 !important; margin: 0; color: black !important)", parserConfig))
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
                            offset: 68,
                            line: 1,
                            column: 69,
                        },
                    },
                    name: "style",
                    children: [
                        {
                            type: "DeclarationList",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 10,
                                    line: 1,
                                    column: 11,
                                },
                                end: {
                                    offset: 67,
                                    line: 1,
                                    column: 68,
                                },
                            },
                            children: [
                                {
                                    type: "Declaration",
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
                                    important: true,
                                    property: "padding",
                                    value: {
                                        type: "Value",
                                        loc: {
                                            source: "<unknown>",
                                            start: {
                                                offset: 19,
                                                line: 1,
                                                column: 20,
                                            },
                                            end: {
                                                offset: 21,
                                                line: 1,
                                                column: 22,
                                            },
                                        },
                                        children: [
                                            {
                                                type: "Number",
                                                loc: {
                                                    source: "<unknown>",
                                                    start: {
                                                        offset: 19,
                                                        line: 1,
                                                        column: 20,
                                                    },
                                                    end: {
                                                        offset: 20,
                                                        line: 1,
                                                        column: 21,
                                                    },
                                                },
                                                value: "0",
                                            },
                                        ],
                                    },
                                },
                                {
                                    type: "Declaration",
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
                                    important: false,
                                    property: "margin",
                                    value: {
                                        type: "Value",
                                        loc: {
                                            source: "<unknown>",
                                            start: {
                                                offset: 41,
                                                line: 1,
                                                column: 42,
                                            },
                                            end: {
                                                offset: 42,
                                                line: 1,
                                                column: 43,
                                            },
                                        },
                                        children: [
                                            {
                                                type: "Number",
                                                loc: {
                                                    source: "<unknown>",
                                                    start: {
                                                        offset: 41,
                                                        line: 1,
                                                        column: 42,
                                                    },
                                                    end: {
                                                        offset: 42,
                                                        line: 1,
                                                        column: 43,
                                                    },
                                                },
                                                value: "0",
                                            },
                                        ],
                                    },
                                },
                                {
                                    type: "Declaration",
                                    loc: {
                                        source: "<unknown>",
                                        start: {
                                            offset: 44,
                                            line: 1,
                                            column: 45,
                                        },
                                        end: {
                                            offset: 67,
                                            line: 1,
                                            column: 68,
                                        },
                                    },
                                    important: true,
                                    property: "color",
                                    value: {
                                        type: "Value",
                                        loc: {
                                            source: "<unknown>",
                                            start: {
                                                offset: 51,
                                                line: 1,
                                                column: 52,
                                            },
                                            end: {
                                                offset: 57,
                                                line: 1,
                                                column: 58,
                                            },
                                        },
                                        children: [
                                            {
                                                type: "Identifier",
                                                loc: {
                                                    source: "<unknown>",
                                                    start: {
                                                        offset: 51,
                                                        line: 1,
                                                        column: 52,
                                                    },
                                                    end: {
                                                        offset: 56,
                                                        line: 1,
                                                        column: 57,
                                                    },
                                                },
                                                name: "black",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });

    test("generates valid input properly", () => {
        expect(generate(parse(`div:style(padding: 0)`, parserConfig))).toEqual(`div:style(padding:0)`);
        expect(generate(parse(`div:style(padding: 0;)`, parserConfig))).toEqual(`div:style(padding:0)`);
        expect(generate(parse(`div:style(padding: 0 !important)`, parserConfig))).toEqual(
            `div:style(padding:0!important)`
        );
        expect(
            generate(parse(`div:style(padding: 0 !important; margin: 0; color: black !important)`, parserConfig))
        ).toEqual(`div:style(padding:0!important;margin:0;color:black!important)`);
    });
});
