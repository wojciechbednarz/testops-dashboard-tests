import { test, expect } from "@playwright/test";
import { TestRunsPage } from "./gui/pages/TestRunsPage";

test.describe("Test Runs Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    const testRunsPage = new TestRunsPage(page);
    await testRunsPage.goToTestRunsPage();
    await testRunsPage.waitForPageToLoad();
  });

  test("Open Test Runs Page", async ({ page }) => {
    const testRunsPage = new TestRunsPage(page);
    const pageTitle = ".testops-title";
    const title = await testRunsPage.getPageTitle(pageTitle);
    const isTestRunListVisible = await testRunsPage.isTestRunListVisible();
    const countPassedTestCases = await testRunsPage.countTestCases('passed');
    
    expect(countPassedTestCases).toBe(5);
    expect(title).toBe("TestOps Test Runs");
    expect(isTestRunListVisible).toBe(true);
  });
});