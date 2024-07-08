import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("should display the login page", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveTitle(/Login/);
    await expect(page.locator("text=Login")).toBeVisible();
  });

  test("should show validation errors on empty submission", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.click('button:has-text("Login")');
    await expect(page.locator("text=Email is required")).toBeVisible();
    await expect(page.locator("text=Password is required")).toBeVisible();
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL("/products");
  });

  test("should show error message with invalid credentials", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "wrong@example.com");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.click('button:has-text("Login")');
    await expect(page.locator("text=Invalid email or password")).toBeVisible();
  });
});
