import { Page, Locator } from "@playwright/test";
import { ToastAssertions } from '../assertions/ToastAssertions';

export class BasePage {
  protected readonly page: Page;

  protected readonly toastMessage: ToastAssertions;
  protected readonly documentsTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.documentsTab = page.locator("#document_catalog-personal");

    this.toastMessage = new ToastAssertions(page); 
  }

  async openDocumentsTab() {
    await this.documentsTab.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

}
