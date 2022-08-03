import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
const pkgJSON = require("./package.json");
/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  {
    input: "src/index.ts",
    plugins: [typescript()],
    output: [
      {
        file: pkgJSON.main,
        format: "umd",
        name: "yamlYoProps",
      },
      {
        file: pkgJSON.module,
        format: "es",
      },
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "build/index.d.ts", format: "cjs" }],
    plugins: [dts()],
  },
];
