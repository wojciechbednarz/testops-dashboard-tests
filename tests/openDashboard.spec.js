import { test, expect } from '@playwright/test';
import { DashboardPage } from './gui/pages/DashboardPage';


test ('Open Dashboard Page', async ( {page} ) => {

    const dashboard = new DashboardPage(page);
    await dashboard.goToDashboardPage();

    await page.waitForTimeout(3000);
})