import { ESCAPE } from "./constants";

/**
 * Finds the next unescaped character in a string.
 *
 * @param source Source string to search in
 * @param character Character to search for
 * @param startIndex Start index to search from
 * @returns Index of the next unescaped character or -1 if none was found
 */
export function findNextUnescapedCharacter(source, character, startIndex = 0) {
    for (let i = startIndex; i < source.length; i++) {
        // The searched character cannot be preceded by an escape
        if (source[i] == character && source[i - 1] != ESCAPE) {
            return i;
        }
    }

    return -1;
}
