import { parse, generate, toPlainObject } from "../../src/index.js";

const parserConfig = {
    context: "selector",
    positions: true,
};

describe(":xpath()", () => {
    test("parses valid input properly", () => {
        // Very simple test, just to make sure it's working
        expect(toPlainObject(parse(":xpath(//test)", parserConfig))).toMatchObject({
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
                    name: "xpath",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 7,
                                    line: 1,
                                    column: 8,
                                },
                                end: {
                                    offset: 13,
                                    line: 1,
                                    column: 14,
                                },
                            },
                            value: "//test",
                        },
                    ],
                },
            ],
        });

        // Test with a more complex expression, which contains a lot of special cases
        expect(toPlainObject(parse(':xpath(//*[contains(text(),"()(cc")])', parserConfig))).toMatchObject({
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
                    type: "PseudoClassSelector",
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
                    name: "xpath",
                    children: [
                        {
                            type: "Raw",
                            loc: {
                                source: "<unknown>",
                                start: {
                                    offset: 7,
                                    line: 1,
                                    column: 8,
                                },
                                end: {
                                    offset: 36,
                                    line: 1,
                                    column: 37,
                                },
                            },
                            value: '//*[contains(text(),"()(cc")]',
                        },
                    ],
                },
            ],
        });
    });

    test("generates valid input properly", () => {
        expect(generate(parse(":xpath(//test)", parserConfig))).toEqual(":xpath(//test)");
        expect(generate(parse(':xpath(//*[contains(text(),"()(cc")])', parserConfig))).toEqual(
            ':xpath(//*[contains(text(),"()(cc")])'
        );
    });
});
