import { build } from "esbuild";
import fs from "node:fs/promises";
import path from "node:path";

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: ["./gen/cybozu/validate/options_pb.js"],
  minify: true,
  bundle: true,
  outfile: "./dist/validate/options_pb.js",
  target: "node14.11",
  platform: "node",
  format: "cjs",
};

await fs.cp(
  path.join(process.cwd(), "gen", "cybozu", "validate", "options_pb.d.ts"),
  path.join(process.cwd(), "dist", "validate", "options_pb.d.ts")
);

build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
