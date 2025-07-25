import { test, expect } from "@playwright/test";
import { DashboardPage } from "./gui/pages/DashboardPage";

test.describe("Dashboard Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goToDashboardPage();
    await dashboard.waitForPageToLoad();
  });

  test("Open Dashboard Page", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const pageTitle = '.testops-title';
  const projectLogo = 'img[alt="Project logo"]'
  const title = await dashboard.getPageTitle(pageTitle);
  const logo = await dashboard.getProjectLogo(projectLogo);
  const isLogoVisible = await dashboard.isProjectLogoVisible(projectLogo);
  const isTitleVisible = await dashboard.isPageTitleVisible(pageTitle);

  expect(title).toBe("TestOps Dashboard");
  expect(logo).toContain(dashboard.projectLogoSrc);
  expect(isLogoVisible).toBe(true);
  expect(isTitleVisible).toBe(true);
  });
});