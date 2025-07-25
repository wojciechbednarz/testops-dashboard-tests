import { Page } from "@playwright/test";

export class BasePage {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToWebsite(baseUrl: string) {
    await this.page.goto(baseUrl);
  }

  async waitForPageToLoad() {
    await this.page.waitForLoadState("load");
  }

  async getPageTitle(pageTitle: string) {
    return await this.page.locator(pageTitle).textContent();
  }
}
