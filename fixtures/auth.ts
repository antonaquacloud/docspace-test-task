import { test as base } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export const test = base.extend<{ adminAuth: void }>({
  adminAuth: [
    async ({ page }, use) => {
      const baseUrl = process.env.DOCSPACE_URL as string;
      const email = process.env.PORTAL_ADMIN_EMAIL as string;
      const password = process.env.PORTAL_ADMIN_PASSWORD as string;

      await page.goto(baseUrl);
      await page.waitForLoadState("networkidle");

      await page.getByPlaceholder("Email").fill(email);
      await page.getByPlaceholder("Password").fill(password);

      const signInButton = page.getByRole("button", { name: "Sign in" });
      await signInButton.click();

      await use();
    },
    { scope: "test", auto: true },
  ],
});
