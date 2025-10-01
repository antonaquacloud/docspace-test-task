import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DocumentsPage extends BasePage {
  readonly actionsMenuButton: Locator;
  readonly newDocumentMenuItem: Locator;

  readonly createDocumentNameInput: Locator;
  readonly createButton: Locator;

  readonly shareContextMenuItem: Locator;
  readonly createRoomContextMenuItem: Locator;
  readonly customRoomTypeOption: Locator;
  readonly roomNameInput: Locator;

  readonly infoPanelDetailsTab: Locator;
  readonly infoPanelWrapper: Locator;
  readonly infoPanelIcon: Locator;

  readonly roomSection: Locator;

  constructor(page: Page) {
    super(page);
    this.actionsMenuButton = page.locator("#actions-main-button");
    this.newDocumentMenuItem = page.locator("#actions_new-document");
    this.createDocumentNameInput = page.locator("#create-text-input");
    this.createButton = page.getByRole("button", { name: "Create" });

    this.shareContextMenuItem = page.getByRole("menuitem", { name: "Share" });
    this.createRoomContextMenuItem = page.getByRole("menuitem", { name: "Create room" });
    this.customRoomTypeOption = page.getByText("Custom room");
    this.roomNameInput = page.getByPlaceholder("Enter name");

    this.infoPanelDetailsTab = page.locator('[data-testid="Details"]');
    this.infoPanelWrapper = page.locator("#InfoPanelWrapper");
    this.infoPanelIcon = page.locator("#info-panel-toggle--open");

    this.roomSection = page.locator("#section");
  }

  async createDocumentViaActions(
    fileName: string,
    closeNewTab: boolean = true
  ) {
    await this.actionsMenuButton.click();
    await this.newDocumentMenuItem.click();
    await this.createDocumentNameInput.fill(fileName);
    await Promise.all([
      this.page.waitForEvent("popup"),
      this.createButton.click(),
    ]);
    //added to close an unnecessary tab as part of a task
    if (closeNewTab) {
      const context = this.page.context();
      const pages = context.pages();
      const newTab = pages.find((p) => p !== this.page);
      if (newTab) {
        await newTab.close();
      }
      await this.page.bringToFront();
    }
  }

  async openContextMenuForFile(fileName: string) {
    await this.page
      .getByRole("link", { name: fileName })
      .click({ button: "right" });
  }

  async createCustomRoomFromCurrentFile(fileName: string, roomName: string) {
    await this.createRoomContextMenuItem.click();
    await this.customRoomTypeOption.click();
    await this.roomNameInput.fill(roomName);
    await this.createButton.click();
    await this.toastMessage.assertToastMessage(
      `Done${fileName}.docx successfully copied to ${roomName}`
    );
  }

  async assertRoomDetails(
    roomName: string,
    roomType: string,
    countFiles: string
  ) {
    //A page refresh and a click on the info icon were added due to problems with the display of elements on the page and the file counter.
    await this.page.reload({ waitUntil: "domcontentloaded" });
    await this.infoPanelIcon.click();
    await this.infoPanelDetailsTab.click();
    await expect(this.infoPanelWrapper).toContainText(roomName);
    await expect(this.infoPanelWrapper).toContainText(roomType);
    await expect(this.infoPanelWrapper).toContainText(countFiles);
  }

  async assertFileInRoom(fileName: string) {
    await expect(this.roomSection).toContainText(fileName);
  }
}
