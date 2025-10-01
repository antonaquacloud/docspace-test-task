import { Page, Locator, expect } from "@playwright/test";

export class ToastAssertions {
  private readonly page: Page;
  private readonly toastContainer: Locator;

  private static readonly HIDE_TIMEOUT_MS = 15000;

  constructor(page: Page) {
    this.page = page;
    this.toastContainer = page.locator(".toast-text-container");
  }

  async assertToastMessage(expectedText: string): Promise<void> {
    await expect(this.toastContainer).toBeVisible();
    await expect(this.toastContainer).toContainText(expectedText);
    await expect(this.toastContainer).not.toBeVisible({
      timeout: ToastAssertions.HIDE_TIMEOUT_MS,
    });
  }
}
