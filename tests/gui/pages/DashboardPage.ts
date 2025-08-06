import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage{
  public readonly projectLogoSrc = "/static/project_logo_small.png";
  private readonly baseUrl: string = 'http://localhost:3000/';

  constructor(page: Page) {
    super(page);
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


}