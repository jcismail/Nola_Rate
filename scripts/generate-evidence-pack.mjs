import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const root = process.cwd();
const evidenceDir = path.join(root, "docs", "compliance", "evidence");
fs.mkdirSync(evidenceDir, { recursive: true });

function run(command) {
  return execSync(command, { cwd: root, encoding: "utf8" }).trim();
}

const now = new Date();
const y = now.getFullYear();
const m = String(now.getMonth() + 1).padStart(2, "0");
const d = String(now.getDate()).padStart(2, "0");
const hh = String(now.getHours()).padStart(2, "0");
const mm = String(now.getMinutes()).padStart(2, "0");
const stamp = `${y}-${m}-${d}_${hh}${mm}`;

const commit = run("git rev-parse --short HEAD");
const branch = run("git branch --show-current");
const status = run("git status --short");

const output = `# Compliance Evidence Pack - ${stamp}

Generated at: ${now.toISOString()}

## Git Snapshot

- Branch: \`${branch}\`
- Commit: \`${commit}\`
- Working tree clean: \`${status === "" ? "yes" : "no"}\`

## Required Verification Commands

Run and attach outputs for:

1. \`npm run lint\`
2. \`npm run compliance:check\`
3. \`npm run build\`
4. \`npm run test:smoke\`

## Screenshot Checklist

Capture and store under this folder:

1. Homepage (top + footer disclosures/logos)
2. Contact page
3. Realtor Partner page
4. Review Us page
5. Book Call page
6. One representative Solution page
7. Thank-you page

## Submission Checklist

1. Include final copy text and commit hash.
2. Include links to required disclosures.
3. Send package to C2 Advertising for written approval before dissemination.
4. Archive approval response in this folder.
`;

const file = path.join(evidenceDir, `EVIDENCE_PACK_${stamp}.md`);
fs.writeFileSync(file, output, "utf8");
console.log(`created ${path.relative(root, file).replaceAll("\\", "/")}`);
