import { Expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ReportsPage extends BasePage {
  private baseUrl: string;
  private pageTitle: string;

  constructor(page: Page, expect: Expect) {
    super(page, expect);
    this.baseUrl = "http://localhost:3000/reports.html";
    this.pageTitle = ".testops-title";
  }

  async getAverageDuration(element: string) {
    const check = this.checkIfElementVisible(element, this.expect);
    const allListElements = await this.page.$$("//ul//li");
    for (let element of allListElements) {
      let elemTextContent = await element.textContent();
      if (elemTextContent?.includes("Avg")) {
        const regex = "Avgsduration:s(d.d+)";
        const search = elemTextContent.search(regex);
        if (search) {
          return search;
        } else {
          console.error(`There was problem 
                        looking for a ${element} in ${allListElements}`);
        }
      }
    }
  }
}
