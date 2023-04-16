import { build } from "esbuild";
import fs from "node:fs/promises";
import path from "node:path";

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: ["./lib/validate_pb.js"],
  minify: true,
  bundle: true,
  outfile: "./dist/index.js",
  target: "node14.11",
  platform: "node",
  format: "cjs",
};

await fs.cp(
  path.join(process.cwd(), "lib", "validate_pb.d.ts"),
  path.join(process.cwd(), "dist", "index.d.ts")
);

build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
