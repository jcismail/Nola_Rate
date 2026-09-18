import { expect, test } from "@playwright/test";

test("homepage loads with core header and compliance footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Nola Rate Mortgage Advisory" })).toBeVisible();
  await expect(
    page.getByText("C2 Financial Corporation | Company NMLS #135622")
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "NMLS Consumer Access" }).last()).toBeVisible();
});

test("core pages are reachable", async ({ page }) => {
  for (const path of ["/", "/contact", "/rate-quote", "/mortgage-calculator"]) {
    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
  }
});

test("homepage CTA and quote flow reflect John’s requested structure", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Apply Now" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Request Rate Quote" }).first()).toBeVisible();

  await page.goto("/rate-quote");
  await expect(page.getByRole("radio", { name: "Purchase" })).toBeVisible();
  await expect(page.getByRole("radio", { name: "Refinance" })).toBeVisible();
  await expect(page.getByText("How did you hear about us?")).toBeVisible();
});

test("homepage includes loan option descriptors", async ({ page }) => {
  await page.goto("/");
  const loanOptions = page.locator("#loan-options");
  await expect(loanOptions.getByText("Conventional")).toBeVisible();
  await expect(loanOptions.getByText("Best suited for borrowers with established credit, income and verified assets for purchase and refinance transactions.")).toBeVisible();
  await expect(loanOptions.getByText("Investor", { exact: true })).toHaveCount(0);
  await expect(loanOptions.getByText("Renovation and Construction")).toBeVisible();
  await expect(loanOptions.locator("h3").first().locator("..")).toHaveClass(/text-center/);
  await expect(page.getByText("The detailed quote form gives John enough context")).toHaveCount(0);
  await expect(page.getByText("Best when you are ready to share your goals")).toHaveCount(0);
  await expect(page.getByText("Share purchase or refinance details, timeline")).toHaveCount(0);
  await expect(page.getByText("Use this for quick questions before you are ready")).toHaveCount(0);
});

test("contact page does not include marketing opt-out checkbox", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByText("Opt me out of marketing emails and marketing phone calls")).toHaveCount(0);
});

test("homepage puts contact details and service areas near the top", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Phone \/ Text\s*504\.408\.9868/ })).toBeVisible();
  await expect(page.getByLabel("Service areas: Louisiana, Mississippi, and Texas")).toBeVisible();
  await expect(page.getByText(/John and his team help borrowers confidently secure financing/)).toBeVisible();
  await expect(page.getByRole("img", { name: "CMA Certified Mortgage Advisor" })).toHaveCount(2);
});

test("quote request shows the correct required purchase and refinance fields", async ({ page }) => {
  await page.goto("/rate-quote");
  await page.getByRole("radio", { name: "Purchase" }).check();
  await expect(page.getByLabel("Purchase Price *")).toBeVisible();
  await expect(page.getByLabel("Down Payment Percentage *")).toBeVisible();
  await expect(page.getByLabel("Down Payment Amount *")).toBeVisible();
  await expect(page.getByLabel("Loan Term *")).toBeVisible();
  await expect(page.getByLabel("Existing Loan Balance *")).toHaveCount(0);
  await expect(page.getByText("Down Payment Type *")).toHaveCount(0);
  await page.getByLabel("Purchase Price *").fill("1450325");
  await expect(page.getByLabel("Purchase Price *")).toHaveValue("$1,450,325");
  await page.getByLabel("Down Payment Percentage *").fill("20");
  await expect(page.getByLabel("Down Payment Amount *")).toHaveValue("$290,065");
  await expect(page.getByLabel("Loan Term *").locator("option", { hasText: "15 Years" })).toHaveText("15 Years");
  await expect(page.locator('select[name="referral_source"] option', { hasText: "Repeat Customer" })).toHaveText("Repeat Customer");

  await page.getByRole("radio", { name: "Refinance" }).check();
  await expect(page.getByLabel("Estimated Property Value *")).toBeVisible();
  await expect(page.getByLabel("Existing Loan Balance *")).toBeVisible();
  await page.getByLabel("Estimated Property Value *").fill("875000");
  await expect(page.getByLabel("Estimated Property Value *")).toHaveValue("$875,000");
  await page.getByLabel("Existing Loan Balance *").fill("450000");
  await expect(page.getByLabel("Existing Loan Balance *")).toHaveValue("$450,000");
  await expect(page.getByLabel("Down Payment Amount *")).toHaveCount(0);
  await expect(page.getByText("Opt me out of marketing")).toHaveCount(0);
});

test("calculator supports purchase synchronization and refinance mode", async ({ page }) => {
  await page.goto("/mortgage-calculator");
  await page.getByLabel("Purchase Price").fill("600000");
  await page.getByLabel("Down Payment Percentage").fill("20");
  await expect(page.getByLabel("Down Payment Amount")).toHaveValue("120000");

  await page.getByRole("button", { name: "Refinance" }).click();
  await expect(page.getByLabel("Current Loan Balance")).toBeVisible();
  await expect(page.getByLabel("Purchase Price")).toHaveCount(0);
  await expect(page.getByLabel("Interest Rate")).toBeVisible();
  await expect(page.getByLabel("Loan Term")).toBeVisible();
});

test("homepage moves About John above final contact and serves full-resolution home photos", async ({ page }) => {
  await page.goto("/");
  const aboutPrecedesContact = await page.locator("#about-john").evaluate((about) => {
    const contact = document.querySelector("#final-contact");
    return Boolean(contact && (about.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING));
  });
  expect(aboutPrecedesContact).toBeTruthy();
  await expect(page.getByRole("img", { name: /classic New Orleans shotgun home/ })).toHaveAttribute("src", "/brand/new-orleans/classic-shotgun-home.jpg");
  await expect(page.getByRole("img", { name: /Colorful New Orleans homes/ })).toHaveAttribute("src", "/brand/new-orleans/colorful-new-orleans-home.jpg");
});

test("lead forms format ten-digit phone numbers and enforce email validity", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Phone", { exact: true }).fill("5044089868");
  await expect(page.getByLabel("Phone", { exact: true })).toHaveValue("504-408-9868");
  await page.getByLabel("Email", { exact: true }).fill("not-an-email");
  expect(await page.getByLabel("Email", { exact: true }).evaluate((input: HTMLInputElement) => input.checkValidity())).toBeFalsy();

  await page.goto("/rate-quote");
  await page.getByLabel("Phone *").fill("4692262429");
  await expect(page.getByLabel("Phone *")).toHaveValue("469-226-2429");
});

test("quote API rejects requests missing required loan details", async ({ request }) => {
  const response = await request.post("/api/leads", {
    data: {
      leadType: "rate_quote",
      transactionType: "purchase",
      name: "Validation Test",
      phone: "5045550100",
      email: "validation@example.com",
    },
  });

  expect(response.status()).toBe(400);
  await expect(response.json()).resolves.toMatchObject({
    error: "Complete all required loan details",
  });
});

test("lead API rejects malformed phone numbers and email addresses", async ({ request }) => {
  const badPhone = await request.post("/api/leads", {
    data: { leadType: "contact_request", name: "Validation Test", phone: "555555", email: "validation@example.com" },
  });
  expect(badPhone.status()).toBe(400);
  await expect(badPhone.json()).resolves.toMatchObject({ error: "Enter a valid 10-digit phone number" });

  const badEmail = await request.post("/api/leads", {
    data: { leadType: "contact_request", name: "Validation Test", phone: "504-555-0100", email: "not-an-email" },
  });
  expect(badEmail.status()).toBe(400);
  await expect(badEmail.json()).resolves.toMatchObject({ error: "Enter a valid email address" });
});

