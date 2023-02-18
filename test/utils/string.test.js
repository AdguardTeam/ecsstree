import { findNextUnescapedCharacter } from "../../src/utils/string";

describe("String utils", () => {
    test("findNextUnescapedCharacter", () => {
        expect(findNextUnescapedCharacter(` \\,\\, , ,`, ",")).toEqual(6);
        expect(findNextUnescapedCharacter(` \\,\\, , ,`, ",", 7)).toEqual(8);

        expect(findNextUnescapedCharacter("", ",")).toEqual(-1);
        expect(findNextUnescapedCharacter(" ", ",")).toEqual(-1);
    });
});
