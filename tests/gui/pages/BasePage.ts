import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

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

  async isElementVisible(element: string): Promise<boolean> {
    return await this.page.locator(element).isVisible();
  }
}
