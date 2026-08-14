import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const root = process.cwd();
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

function argumentValue(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

function git(command) {
  return execSync(command, { cwd: root, encoding: "utf8" }).trim();
}

function runCheck(script) {
  try {
    // Windows cannot reliably launch npm.cmd directly with execFileSync.
    // execSync delegates through the platform shell and preserves the output
    // that belongs in the compliance validation record.
    const output = execSync(`${npmCommand} run ${script}`, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { passed: true, output: output.trim() };
  } catch (error) {
    const stdout = typeof error.stdout === "string" ? error.stdout : "";
    const stderr = typeof error.stderr === "string" ? error.stderr : "";
    return { passed: false, output: `${stdout}\n${stderr}`.trim() };
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function safeName(value) {
  return value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "");
}

const routes = [
  { title: "Homepage", path: "/" },
  { title: "Rate Quote", path: "/rate-quote" },
  { title: "Calculator", path: "/mortgage-calculator" },
  { title: "Questions", path: "/contact" },
];

const externalDestinations = [
  { title: "LinkedIn", url: "https://www.linkedin.com/in/johnismail" },
  {
    title: "Apply Now",
    url: "https://135622.my1003app.com/231283/register?time=1767750807614",
  },
];

const baseUrl = argumentValue("--base-url", "http://localhost:3000").replace(/\/$/, "");
const previewUrl = argumentValue("--preview-url", "Not provided");
const browserChannel = argumentValue("--browser-channel", "msedge");
const now = new Date();
const dateStamp = now.toISOString().slice(0, 10);
const timeStamp = now.toISOString().replaceAll(/[:.]/g, "-");
const packName = `Nola_Rate_Compliance_Review_${timeStamp}`;
const evidenceRoot = path.join(root, "docs", "compliance", "evidence");
const packDir = path.join(evidenceRoot, packName);
const screenshotsDir = path.join(packDir, "screenshots");
const pdfDir = path.join(packDir, "individual-pdfs");
const slicesDir = path.join(packDir, ".slices");

for (const directory of [packDir, screenshotsDir, pdfDir, slicesDir]) {
  fs.mkdirSync(directory, { recursive: true });
}

const fullCommit = git("git rev-parse HEAD");
const branch = git("git branch --show-current");
const websiteStatus = git("git status --short -- src/app src/components public");
const lint = runCheck("lint");
const compliance = runCheck("compliance:check");
const buildIdPath = path.join(root, ".next", "BUILD_ID");
const buildId = fs.existsSync(buildIdPath) ? fs.readFileSync(buildIdPath, "utf8").trim() : "not available";

const browser = await chromium.launch({ channel: browserChannel, headless: true });
const desktopContext = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  colorScheme: "light",
});
const page = await desktopContext.newPage();
const captures = [];

async function preparePage(targetPage, url) {
  const response = await targetPage.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
  });
  if (!response || !response.ok()) {
    throw new Error(`Unable to capture ${url}: HTTP ${response?.status() ?? "unknown"}`);
  }

  await targetPage.waitForSelector("main", { timeout: 30_000 });
  await targetPage.addStyleTag({
    content: `
      nextjs-portal,
      [data-nextjs-toast],
      [data-next-badge-root] { display: none !important; }
      html { scroll-behavior: auto !important; }
    `,
  });

  await targetPage.evaluate(async () => {
    await document.fonts.ready;
    const step = Math.max(500, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 90));
    }
    await Promise.all(
      Array.from(document.images).map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      })
    );
    window.scrollTo(0, 0);
  });
  await targetPage.waitForTimeout(250);
}

try {
  for (const [index, route] of routes.entries()) {
    const number = String(index + 1).padStart(2, "0");
    const fileStem = `${number}-${safeName(route.title)}`;
    const url = `${baseUrl}${route.path}`;
    process.stdout.write(`[${index + 1}/${routes.length}] Capturing ${route.title}...\n`);

    await preparePage(page, url);
    const screenshotPath = path.join(screenshotsDir, `${fileStem}.jpg`);
    await page.screenshot({
      path: screenshotPath,
      type: "jpeg",
      quality: 72,
      fullPage: true,
    });

    const pdfPath = path.join(pdfDir, `${fileStem}.pdf`);
    await page.emulateMedia({ media: "screen" });
    await page.pdf({
      path: pdfPath,
      format: "Letter",
      printBackground: true,
      margin: { top: "0.28in", right: "0.28in", bottom: "0.28in", left: "0.28in" },
    });

    const pageHeight = await page.evaluate(() =>
      Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    );
    const sliceHeight = 1000;
    const slices = [];
    for (let y = 0, part = 1; y < pageHeight; y += sliceHeight, part += 1) {
      const scrollPosition = Math.min(y, Math.max(0, pageHeight - sliceHeight));
      await page.evaluate((position) => window.scrollTo(0, position), scrollPosition);
      await page.waitForTimeout(80);
      const slicePath = path.join(slicesDir, `${fileStem}-${String(part).padStart(2, "0")}.jpg`);
      await page.screenshot({
        path: slicePath,
        type: "jpeg",
        quality: 68,
      });
      slices.push(slicePath);
    }

    captures.push({ ...route, number, fileStem, screenshotPath, pdfPath, slices });
  }

  process.stdout.write("Capturing mobile homepage...\n");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme: "light",
  });
  const mobilePage = await mobileContext.newPage();
  await preparePage(mobilePage, `${baseUrl}/`);
  await mobilePage.screenshot({
    path: path.join(screenshotsDir, "00-homepage-mobile.jpg"),
    type: "jpeg",
    quality: 74,
    fullPage: true,
  });
  await mobileContext.close();

  const logoUrl = pathToFileURL(path.join(root, "public", "brand", "nola-rate-logo.png")).href;
  const routeRows = captures
    .map(
      (capture) => `
        <tr>
          <td>${capture.number}</td>
          <td>${escapeHtml(capture.title)}</td>
          <td>${escapeHtml(capture.path)}</td>
        </tr>`
    )
    .join("");
  const externalRows = externalDestinations
    .map(
      (destination) => `
        <tr>
          <td>${escapeHtml(destination.title)}</td>
          <td>${escapeHtml(destination.url)}</td>
          <td>External destination</td>
        </tr>`
    )
    .join("");
  const capturePages = captures
    .flatMap((capture) =>
      capture.slices.map(
        (slice, index) => `
          <section class="capture-page">
            <header>
              <strong>${capture.number}. ${escapeHtml(capture.title)}</strong>
              <span>${escapeHtml(capture.path)} · view ${index + 1} of ${capture.slices.length}</span>
            </header>
            <img src="${pathToFileURL(slice).href}" alt="${escapeHtml(capture.title)}" />
          </section>`
      )
    )
    .join("");

  const consolidatedHtml = `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Nola Rate Compliance Review</title>
        <style>
          @page { size: Letter landscape; margin: 0; }
          * { box-sizing: border-box; }
          body { margin: 0; font-family: Arial, sans-serif; color: #172033; background: white; }
          .cover, .route-index, .capture-page { width: 11in; height: 8.5in; break-after: page; overflow: hidden; }
          .cover { padding: 0.7in; background: #121e5b; color: white; display: flex; flex-direction: column; }
          .cover img { width: 3.4in; height: auto; }
          .cover .label { margin-top: 0.7in; color: #ffd534; font-size: 13px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; }
          .cover h1 { margin: 0.18in 0 0; max-width: 8.5in; font-size: 42px; line-height: 1.08; }
          .cover .notice { margin-top: 0.35in; width: fit-content; border: 2px solid #ffd534; border-radius: 999px; padding: 10px 16px; color: #ffd534; font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
          .cover dl { margin-top: auto; display: grid; grid-template-columns: 1.65in 1fr; gap: 8px 18px; font-size: 13px; }
          .cover dt { color: #f4d36a; font-weight: 700; }
          .cover dd { margin: 0; overflow-wrap: anywhere; }
          .route-index { padding: 0.55in 0.7in; }
          .route-index h2 { margin: 0; color: #121e5b; font-size: 28px; }
          .route-index h3 { margin: 18px 0 6px; color: #121e5b; font-size: 16px; }
          .route-index p { margin: 8px 0 14px; color: #5f6270; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; font-size: 11px; }
          th, td { border-bottom: 1px solid #e5dcc0; padding: 5px 8px; text-align: left; }
          th { background: #f4efd9; color: #121e5b; }
          .capture-page { display: flex; flex-direction: column; background: #f7f6ef; }
          .capture-page header { height: 0.48in; flex: 0 0 0.48in; padding: 0 0.28in; background: #121e5b; color: white; display: flex; align-items: center; justify-content: space-between; font-size: 11px; }
          .capture-page header span { color: #f4d36a; }
          .capture-page img { width: 11in; height: 8.02in; object-fit: contain; object-position: top center; display: block; }
        </style>
      </head>
      <body>
        <section class="cover">
          <img src="${logoUrl}" alt="Nola Rate Mortgage Advisory" />
          <p class="label">Compliance review packet</p>
          <h1>Website review copy</h1>
          <p class="notice">Preview only · Not approved for public distribution</p>
          <dl>
            <dt>Prepared</dt><dd>${escapeHtml(now.toISOString())}</dd>
            <dt>Review environment</dt><dd>${escapeHtml(previewUrl)}</dd>
            <dt>Git branch</dt><dd>${escapeHtml(branch)}</dd>
            <dt>Base commit</dt><dd>${escapeHtml(fullCommit)}</dd>
            <dt>Local changes</dt><dd>${websiteStatus === "" ? "None" : "Included in this review copy"}</dd>
            <dt>Review scope</dt><dd>${routes.length} hosted pages and ${externalDestinations.length} external navigation destinations; API route excluded</dd>
          </dl>
        </section>
        <section class="route-index">
          <h2>Navigation review scope</h2>
          <p>The four hosted Nola Rate pages are reproduced in this packet. Third-party destinations are identified by name and configured URL, but their content is not reproduced as Nola Rate material.</p>
          <h3>Hosted Nola Rate pages</h3>
          <table><thead><tr><th>#</th><th>Page</th><th>Route</th></tr></thead><tbody>${routeRows}</tbody></table>
          <h3>External navigation destinations</h3>
          <table><thead><tr><th>Navigation label</th><th>Configured URL</th><th>Type</th></tr></thead><tbody>${externalRows}</tbody></table>
        </section>
        ${capturePages}
      </body>
    </html>`;

  const htmlPath = path.join(packDir, ".consolidated.html");
  fs.writeFileSync(htmlPath, consolidatedHtml, "utf8");
  const consolidatedPage = await desktopContext.newPage();
  await consolidatedPage.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await consolidatedPage.pdf({
    path: path.join(packDir, `Nola_Rate_Compliance_Review_${dateStamp}.pdf`),
    format: "Letter",
    landscape: true,
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
  await consolidatedPage.close();

  const routeList = captures.map((capture) => `- ${capture.number}. ${capture.title}: \`${capture.path}\``).join("\n");
  const externalList = externalDestinations
    .map((destination) => `- ${destination.title}: ${destination.url} (external)`)
    .join("\n");
  const manifest = `# Nola Rate Website Compliance Review

**Status:** PREVIEW ONLY — NOT APPROVED FOR PUBLIC DISTRIBUTION

- Generated: ${now.toISOString()}
- Review environment: ${previewUrl}
- Capture source: ${baseUrl}
- Git branch: \`${branch}\`
- Git base commit: \`${fullCommit}\`
- Local development changes included: ${websiteStatus === "" ? "no" : "yes"}
- Production build ID: \`${buildId}\`
- ESLint: ${lint.passed ? "passed" : "failed"}
- Advertising compliance check: ${compliance.passed ? "passed" : "failed"}

## Contents

- Consolidated landscape PDF with every hosted page
- Individual searchable PDFs for each hosted page
- Full-page desktop screenshots for each hosted page
- Mobile homepage screenshot
- Validation output and suggested email copy

## Routes reviewed

${routeList}

## External navigation destinations

${externalList}

## Important review notes

- Forms and external links are shown visually but are not interactive in the PDFs.
- LinkedIn and Apply Now lead to third-party services; their destination content is not reproduced in this packet.
- The lead-submission API is operational infrastructure and is intentionally excluded from advertising review.
- Written compliance approval should be archived before any production promotion or public dissemination.
`;
  fs.writeFileSync(path.join(packDir, "MANIFEST.md"), manifest, "utf8");

  const checks = `NOLA RATE COMPLIANCE REVIEW VALIDATION
Generated: ${now.toISOString()}
Branch: ${branch}
Base commit: ${fullCommit}
Local development changes included: ${websiteStatus === "" ? "no" : "yes"}
Hosted page count: ${routes.length}
External navigation destination count: ${externalDestinations.length}
Production build ID: ${buildId}

=== npm run lint (${lint.passed ? "PASSED" : "FAILED"}) ===
${lint.output}

=== npm run compliance:check (${compliance.passed ? "PASSED" : "FAILED"}) ===
${compliance.output}
`;
  fs.writeFileSync(path.join(packDir, "VALIDATION.txt"), checks, "utf8");

  const emailTemplate = `Subject: Nola Rate website — compliance review request

Hello,

Attached is the Nola Rate website compliance review packet prepared from the current local development build.

Review environment: ${previewUrl}

The packet includes all four hosted Nola Rate pages, required footer disclosures, individual page PDFs, and desktop/mobile screenshots. It also identifies the LinkedIn and Apply Now third-party destinations. This material is for review only and has not been promoted to production.

Please provide written approval or requested revisions before public launch.

Thank you,
John Ismail
`;
  fs.writeFileSync(path.join(packDir, "EMAIL_TEMPLATE.txt"), emailTemplate, "utf8");

  fs.rmSync(htmlPath, { force: true });
  fs.rmSync(slicesDir, { recursive: true, force: true });
} finally {
  await desktopContext.close();
  await browser.close();
}

process.stdout.write(`Created compliance review pack: ${path.relative(root, packDir)}\n`);
