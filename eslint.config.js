import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      sourceType: "module",
      ecmaVersion: "latest",
    },
    extends: [js.configs.recommended],
    rules: {
      // Best Practices
      eqeqeq: "warn", // pakai === bukan ==
      curly: "warn", // selalu pakai kurung kurawal di if/else/while
      "no-eval": "error", // jangan pake eval()
      "no-implied-eval": "error", // larang eval tersembunyi
      "no-throw-literal": "warn", // harus throw error object, bukan literal

      "no-console": "warn", // console.log hanya warning
      "no-debugger": "error", // larang debugger di production
      "no-dupe-args": "error", // tidak boleh argumen fungsi duplikat
      "no-dupe-keys": "error", // tidak boleh duplikat key object
      "no-duplicate-case": "error", // case di switch tidak boleh duplikat
      "no-empty": "warn", // blok kosong harus dihindari
      "no-ex-assign": "error", // jangan assign exception error

      "no-undef": "warn", // variabel harus sudah dideklarasi
      "no-unused-vars": "warn", // variabel yang gak kepake harus dihapus

      semi: ["warn", "always"], // wajib titik koma
      quotes: ["warn", "double"], // wajib pakai double quotes
      indent: ["warn", 2], // indentasi 2 spasi
      "eol-last": ["warn", "always"], // wajib newline di akhir file

      "prefer-const": "warn", // prefer const kalau tidak reassigned
      "arrow-spacing": "warn", // spacing di arrow function

      "no-multi-spaces": "warn", // larang spasi ganda
      "no-trailing-spaces": "warn", // larang spasi kosong di akhir baris
      "keyword-spacing": "warn", // kasih spasi setelah keyword (if, else, etc)
    },
  },
]);
