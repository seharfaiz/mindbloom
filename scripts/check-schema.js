#!/usr/bin/env node
// Guards against `prisma/schema.prisma` accidentally being reset to a
// SQLite datasource (e.g. by re-running `npx prisma init`), which is
// incompatible with this schema's Json/array/enum/@db.Text fields.

const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "..", "prisma", "schema.prisma");
const schema = fs.readFileSync(schemaPath, "utf8");

const datasourceMatch = schema.match(/datasource\s+db\s*{([^}]*)}/s);
if (!datasourceMatch) {
  console.error("\n✗ Could not find a `datasource db { ... }` block in prisma/schema.prisma.\n");
  process.exit(1);
}

const providerMatch = datasourceMatch[1].match(/provider\s*=\s*"([^"]+)"/);
const provider = providerMatch?.[1];

if (provider !== "postgresql") {
  console.error(
    `\n✗ prisma/schema.prisma's datasource provider is "${provider}", but this schema requires "postgresql".\n` +
      `  This usually happens after re-running \`npx prisma init\`, which resets the datasource block to SQLite.\n` +
      `  Fix: open prisma/schema.prisma and set:\n\n` +
      `    datasource db {\n      provider = "postgresql"\n      url      = env("DATABASE_URL")\n    }\n\n` +
      `  See docs/database.md for details.\n`
  );
  process.exit(1);
}

console.log("✓ prisma/schema.prisma datasource provider is postgresql");
