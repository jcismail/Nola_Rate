import { expect, test } from "@playwright/test";

test("homepage loads with core header and compliance footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Nola Rate")).toBeVisible();
  await expect(
    page.getByText("C2 Financial Corporation | Company NMLS #135622")
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "NMLS Consumer Access" }).first()).toBeVisible();
});

test("core pages are reachable", async ({ page }) => {
  for (const path of ["/contact", "/realtor-partner", "/review-us", "/book-call"]) {
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

test("thank-you route renders", async ({ page }) => {
  await page.goto("/thank-you?type=rate_quote");
  await expect(page.getByRole("heading", { name: "Your Rate Quote Request Is In" })).toBeVisible();
});

