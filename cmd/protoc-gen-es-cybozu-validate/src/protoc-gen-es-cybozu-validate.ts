import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import pkg from "../package.json";
import { generateTs } from "./typescript";

export const protocGenEsCybozuValidate = createEcmaScriptPlugin({
  name: "protoc-gen-es-cybozu-validate",
  version: `v${pkg.version}`,
  generateTs,
});
