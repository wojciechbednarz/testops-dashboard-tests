import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TestRunsPage extends BasePage{
  private readonly baseUrl: string = "http://localhost:3000/tests.html";
  private readonly testRunList: string = '#testList';
  private readonly allTestCases: string = '//div[@class="test-entry"]//span';

  constructor(page: Page) {
    super(page);
  }

  async goToTestRunsPage() {
    await this.page.goto(this.baseUrl);
  }

  async isTestRunListVisible() {
    return await this.page.locator(this.testRunList).isVisible();
  }

  async countTestCases(typeOfTestCase: string): Promise<number> {
    const allTestCases = await this.page.$$(this.allTestCases);
    let count = 0;
    for(const testCase of allTestCases) {
      const testCaseText = await testCase.textContent();
      try {
        if (testCaseText?.toLowerCase().includes(typeOfTestCase.toLowerCase())) {
          count += 1;
        }
      } catch (e) {
        console.error(`Wrong test case type: ${typeOfTestCase}`);
      }
    }
    return count;
  }
}
