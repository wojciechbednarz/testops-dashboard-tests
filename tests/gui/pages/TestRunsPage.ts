import { Page } from "@playwright/test";

export class TestRunsPage {
  private page: Page;
  private baseUrl: string;
  private pageTitle: string;
  private testRunList: string;
  private allTestCases: string

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = "http://localhost:3000/tests.html";
    this.pageTitle = ".testops-title";
    this.testRunList = '#testList';
    this.allTestCases = '//div[@class="test-entry"]//span'
  }

  async goToTestRunsPage() {
    await this.page.goto(this.baseUrl);
  }

  async getPageTitle() {
    return await this.page.locator(this.pageTitle).textContent();
  }

  async isTestRunListVisible() {
    return await this.page.locator(this.testRunList).isVisible();
  }

  async waitForPageToLoad() {
    await this.page.waitForLoadState("load");
  }

  async countTestCases(typeOfTestCase: string) {
    const allTestCases = await this.page.$$(this.allTestCases);
    let count = 0
    for(const testCase of allTestCases) {
      const testCaseText = await testCase.textContent()
      try {
        if (testCaseText?.includes(`${typeOfTestCase}`)) {
          count += 1
      }
      } catch (e) {
        console.error(`Wrong test case type: ${typeOfTestCase}`)
      }
    }
    return count
  }
}
