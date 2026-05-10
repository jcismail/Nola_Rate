import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const srcDir = path.join(rootDir, "src");
const layoutFile = path.join(srcDir, "app", "layout.tsx");
const complianceFooterFile = path.join(
  srcDir,
  "components",
  "compliance",
  "ComplianceFooter.tsx"
);

const textExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".md", ".mdx", ".txt"]);
const excludedDirs = new Set(["node_modules", ".next", ".git"]);

const prohibitedPatterns = [
  /\byour loan is guaranteed\b/i,
  /\bno cost loan\b/i,
  /\bskip mortgage payments?\b/i,
  /\bno points?,?\s*no fee loan\b/i,
  /\bguarantee(?:d|s)?\s+(?:the\s+)?lowest rate\b/i,
  /\blowest rates available\b/i,
  /\bwe pay closing costs\b/i,
  /\bbest rates?\b/i,
  /\bbetter terms?\b/i,
  /\bleading mortgage company\b/i,
  /\bpre-?approved\b/i,
];

const triggerTerms = [
  /\b\d+(?:\.\d+)?%\s+down\b/i,
  /\$\s?\d[\d,]*(?:\.\d{1,2})?\s+down payment\b/i,
  /\bamount of any one payment\b/i,
  /\bfinance charge\b/i,
  /\bperiod of repayment\b/i,
  /\$\s?\d[\d,]*(?:\.\d{1,2})?\s*(?:\/\s*month|per\s+month)?/i,
];

const ratePattern = /\b\d+(?:\.\d+)?%\s*(?:apr|interest|rate)\b/i;
const aprPattern = /\bapr\b/i;

const requiredFooterChecks = [
  /nmlsconsumeraccess\.org/i,
  /c2 financial corporation/i,
  /not available to persons located outside the state\s+of louisiana and mississippi/i,
  /not acting on behalf\s+of or at the direction\s+of\s+hud\/fha or the va/i,
];

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (excludedDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(fullPath));
      continue;
    }
    if (!textExtensions.has(path.extname(entry.name))) continue;
    results.push(fullPath);
  }
  return results;
}

function relative(file) {
  return path.relative(rootDir, file).replaceAll("\\", "/");
}

const issues = [];
const warnings = [];

if (!fs.existsSync(complianceFooterFile)) {
  issues.push(
    `Missing required disclosure component: ${relative(complianceFooterFile)}`
  );
}

if (!fs.existsSync(layoutFile)) {
  issues.push(`Missing layout file: ${relative(layoutFile)}`);
} else {
  const layoutText = fs.readFileSync(layoutFile, "utf8");
  if (!/ComplianceFooter/.test(layoutText)) {
    issues.push(
      "Root layout must render ComplianceFooter so disclosures appear on all pages."
    );
  }
}

if (fs.existsSync(complianceFooterFile)) {
  const footerText = fs.readFileSync(complianceFooterFile, "utf8");
  for (const pattern of requiredFooterChecks) {
    if (!pattern.test(footerText)) {
      issues.push(
        `Compliance footer missing required disclosure text matching: ${pattern}`
      );
    }
  }
}
const globalFhaVaDisclosurePresent = fs.existsSync(complianceFooterFile)
  ? /not acting on behalf\s+of or at the direction\s+of\s+hud\/fha or the va/i.test(
      fs.readFileSync(complianceFooterFile, "utf8").toLowerCase()
    ) ||
    /not individually approved by the fha or hud/i.test(
      fs.readFileSync(complianceFooterFile, "utf8").toLowerCase()
    )
  : false;

for (const file of walk(srcDir)) {
  const rel = relative(file);
  const text = fs.readFileSync(file, "utf8");
  const lower = text.toLowerCase();

  for (const pattern of prohibitedPatterns) {
    if (pattern.test(text)) {
      issues.push(`${rel}: contains prohibited phrase pattern ${pattern}`);
    }
  }

  const containsRate = ratePattern.test(text);
  const containsRateWord = /\brate\b/i.test(text) || /\binterest\b/i.test(text);
  if (containsRate && containsRateWord && !aprPattern.test(text)) {
    warnings.push(
      `${rel}: appears to advertise a rate/percentage without APR disclosure in the same file.`
    );
  }

  const hasTriggerTerm = triggerTerms.some((pattern) => pattern.test(text));
  if (hasTriggerTerm && !aprPattern.test(text)) {
    warnings.push(
      `${rel}: appears to include ad trigger terms but no APR reference; review for Reg Z trigger-term disclosures.`
    );
  }

  if (/\btestimonial/i.test(text) && /\bai\b/i.test(text)) {
    warnings.push(
      `${rel}: mentions testimonial + AI together; confirm no AI-generated testimonials are published.`
    );
  }

  if (/\bfha\b/i.test(text) || /\bva\b/i.test(text)) {
    const hasRequiredDisclaimer =
      /not acting on behalf of or at the direction of hud\/fha or the va/i.test(lower) ||
      /not individually approved by the fha or hud/i.test(lower);
    if (
      !hasRequiredDisclaimer &&
      !globalFhaVaDisclosurePresent &&
      !rel.includes("ComplianceFooter.tsx")
    ) {
      warnings.push(
        `${rel}: includes FHA/VA references; verify the required FHA/VA broker disclaimer is present on-page or globally.`
      );
    }
  }
}

if (issues.length) {
  console.error("Nola Rate advertising compliance check failed:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

if (warnings.length) {
  console.warn("Nola Rate advertising compliance warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

console.log("Nola Rate advertising compliance check passed.");

