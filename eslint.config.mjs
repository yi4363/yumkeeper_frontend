import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tailwind from "eslint-plugin-tailwindcss";

const compat = new FlatCompat();

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ),
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react": react,
      "react-hooks": reactHooks,
      "tailwindcss": tailwind,
    },
    rules: {
      // TypeScript
      "@typescript-eslint/no-explicit-any": "warn", // any 型の使用を警告
      "@typescript-eslint/explicit-module-boundary-types": "off", // 戻り値の型指定を強制しない
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // 未使用の変数を警告（`_`で始まるものは許容）

      // React
      "react/jsx-no-useless-fragment": "warn", // 不要な <></> を警告
      "react/jsx-boolean-value": ["warn", "never"], // e.g. <Component isLoading={true} />を警告。`={true}` は不要。
      "react/self-closing-comp": "warn", // e.g. <img></img> を <img />にするよう警告
      "react-hooks/exhaustive-deps": "off", // フックの依存配列の漏れを警告。 NOTE: このルールに従うとバグが多数出たためオフに。
      "react-hooks/rules-of-hooks": "error", // フック呼び出し時の構文ミスはエラー

      // Tailwind
      "tailwindcss/no-custom-classname": "off", // カスタムクラスの使用を許容
      "tailwindcss/no-contradicting-classname": "error", // 'w-4 w-8'のような矛盾するclassNameを検出

      // その他
      "eqeqeq": "warn", // 厳密比較を推奨（`===` と `!==`）
      "no-useless-assignment": "warn", // 値が未使用なら代入先の変数に警告
    },
    ignores: ["node_modules/", ".next/", "out/", ".env*", "*.d.ts"],
  },
];

export default eslintConfig;
