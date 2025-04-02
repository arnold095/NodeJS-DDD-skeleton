const { execSync } = require("child_process");

/**
 * When lint-staged runs commands, it adds files matching the patterns as arguments
 * at the end of the command, meaning it ends up executing the following:
 * tsc --project tsconfig.json --noEmit file1.ts file2.ts file3.ts
 *
 * This causes an error because tsc does not allow using --project and specifying files
 * simultaneously https://github.com/microsoft/TypeScript/issues/27379#issuecomment-425245572
 *
 * This is a "hack" to achieve runtime type-checking with lint-staged.
 */

try {
  execSync("tsc --project tsconfig.json --noEmit", { stdio: "inherit" });
  process.exit(0);
} catch (err) {
  process.exit(1);
}
