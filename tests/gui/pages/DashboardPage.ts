import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage{
  public projectLogoSrc = "/static/project_logo_small.png";
  private baseUrl: string;

  constructor(page: Page) {
    super(page);
    this.baseUrl = 'http://localhost:3000/index.html';
  }

    async goToDashboardPage() {
        await this.page.goto(this.baseUrl);
    }

    async getProjectLogo(projectLogo: string) {
        return await this.page.locator(projectLogo).getAttribute('src');
    }

    async isProjectLogoVisible(projectLogo: string) {
        return await this.page.locator(projectLogo).isVisible();
    }

    async isPageTitleVisible(pageTitle: string) {
        return await this.page.locator(pageTitle).isVisible();
    }

    async waitForPageToLoad() {
        await this.page.waitForLoadState('load');
    }


}