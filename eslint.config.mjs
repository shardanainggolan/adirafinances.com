import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // The template ships a compiled stylesheet that sizes every image through
    // CSS classes, and the art assets have no intrinsic dimensions declared.
    // Swapping <img> for next/image would change the rendered markup and the
    // layout, so plain <img> is intentional here.
    files: ["components/**/*.tsx", "app/**/*.tsx"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendor libraries kept verbatim from the template.
    "public/js/**",
  ]),
]);

export default eslintConfig;
