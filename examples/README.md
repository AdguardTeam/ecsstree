# ECSSTree examples

This project contains examples of how to use the ECSSTree library. Our examples are written in TypeScript and are located in the `src` directory. Each example is a separate TypeScript file. Source codes are well commented and should be self-explanatory.

ECSSTree uses EXACTLY the same AST as the [CSS Tree](https://github.com/csstree/csstree), so you can use the [CSS Tree documentation](https://github.com/csstree/csstree/tree/master/docs) to learn more about the API, AST structure, etc.

## Running examples

- Install dependencies by running `yarn` command in the root directory of the project. If you don't have `yarn` installed, you can install it by following the instructions on the [official website](https://yarnpkg.com/getting-started/install).
- Run `yarn ts-node-esm src/{example-name}.ts` to run the specific example. For example, to run the `parsing-selectors` example, run `yarn ts-node-esm src/parsing-selectors.ts`. [ts-node](https://typestrong.org/ts-node/) makes it possible to run TypeScript files directly, same as `node` does with JavaScript files.

## List of examples

Here is a list of currently available examples:

- `parsing-selectors`:
  - Selector parsing example
  - Converting AST to plain object and back
  - Generating CSS from AST (serializing)
- `validate-regexp`:
  - Parsing selectors, then validating parameters of `:contains` pseudo-class with the regexpp library to check if a valid regular expression is used as a parameter
- `validate-xpath`
  - Parsing selectors, then validating parameters of `:xpath` pseudo-class with the xpath library to check if a valid XPath expression is used as a parameter
