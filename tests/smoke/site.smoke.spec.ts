import { expect, test } from "@playwright/test";

test("homepage loads with core header and compliance footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("GulfRate")).toBeVisible();
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

test("thank-you route renders", async ({ page }) => {
  await page.goto("/thank-you?type=rate_quote");
  await expect(page.getByRole("heading", { name: "Your Rate Quote Request Is In" })).toBeVisible();
});
