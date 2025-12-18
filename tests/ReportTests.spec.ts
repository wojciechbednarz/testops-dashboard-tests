import { test, expect } from '@playwright/test';
import { ReportsPage } from './gui/pages/ReportsPage';


test.describe("Reports Page tests", () => {
    test.beforeEach(async ( {page} ) => {
        const reportsPage = new ReportsPage(page);
        await reportsPage.goToReportsPage();
        await reportsPage.waitForPageToLoad();

    })
});



test("Open Reports Page", async ( {page} ) => {
    const reportsPage = new ReportsPage(page);
    const reportsTitle = '#reports-title';
    const testDuration = '//div//span[@class="test-duration"]'
    const title = await reportsPage.getPageTitle(reportsTitle);
    const avgDuration = await reportsPage.getAverageDuration(testDuration);


    expect(title).toBe("TestOps Dashboard");
})