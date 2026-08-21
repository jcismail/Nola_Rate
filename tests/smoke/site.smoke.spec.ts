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
  await expect(page.getByText("Conventional")).toBeVisible();
  await expect(page.getByText("Flexible financing for primary homes, second homes, and common purchase or refinance scenarios.")).toBeVisible();
});

test("contact page does not include marketing opt-out checkbox", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByText("Opt me out of marketing emails and marketing phone calls")).toHaveCount(0);
});

test("homepage puts contact details and service areas near the top", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Phone\s*504\.408\.9868/ })).toBeVisible();
  await expect(page.getByLabel("Service areas: Louisiana, Mississippi, and Texas")).toBeVisible();
  await expect(page.getByText(/John and his team help borrowers confidently secure financing/)).toBeVisible();
});

test("quote request shows the correct required purchase and refinance fields", async ({ page }) => {
  await page.goto("/rate-quote");
  await page.getByRole("radio", { name: "Purchase" }).check();
  await expect(page.getByLabel("Purchase Price *")).toBeVisible();
  await expect(page.getByLabel("Down Payment Amount *")).toBeVisible();
  await expect(page.getByLabel("Loan Term *")).toBeVisible();
  await expect(page.getByLabel("Existing Loan Balance *")).toHaveCount(0);

  await page.getByRole("radio", { name: "Refinance" }).check();
  await expect(page.getByLabel("Estimated Property Value *")).toBeVisible();
  await expect(page.getByLabel("Existing Loan Balance *")).toBeVisible();
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

