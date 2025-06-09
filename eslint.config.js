// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["dist/"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      sourceType: "module",
      ecmaVersion: "latest",
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
      semi: ["warn", "always"],
      quotes: ["warn", "double"],
      indent: ["warn", 2],
    },
  },

  {
    files: ["**/*.ts"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-console": "warn",
      semi: ["warn", "always"],
      quotes: ["warn", "double"],

      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-var-requires": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  }
);
