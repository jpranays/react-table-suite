import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

export default [
	{
		input: "src/index.tsx",
		output: [
			{
				file: "dist/index.esm.js",
				format: "esm",
				sourcemap: false,
			},
		],
		external: ["react"],
		plugins: [
			resolve(),
			commonjs(),
			typescript({
				tsconfig: "./tsconfig.json",
				outputToFilesystem: true,
			}),
			terser(),
			peerDepsExternal(),
			postcss({
				extensions: [".css", ".scss"],
				extract: false,
				minimize: true,
				use: [
					[
						"sass",
						{
							includePaths: ["./src/styles"],
						},
					],
				],
				
			}),
		],
	},
	{
		input: "./dist/types/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "es" }],
		plugins: [dts()],
	},
];
