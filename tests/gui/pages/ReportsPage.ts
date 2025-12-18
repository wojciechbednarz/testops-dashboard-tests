import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ReportsPage extends BasePage {
  private readonly baseUrl: string = "http://localhost:3000/reports.html";

  constructor(page: Page) {
    super(page);
  }

  async goToReportsPage() {
    await this.page.goto(this.baseUrl);
  }

  async calculateAverage(element: string[]): Promise<string | null> {
    
    array.forEach(element => {
      
    });
  }

  async getAverageDuration(element: string): Promise<string | null> {
    const isVisible = await this.isElementVisible(element);
    if (!isVisible) {
      console.error(`Element ${element} is not visible`);
      return null;
    }
    
    const allListElements = await this.page.$$(element);
    for (let element of allListElements) {
      let elemTextContent = await element.textContent();
      if (elemTextContent?.includes("Avg")) {
        const regex = /Avg\s+duration:\s+(\d+\.\d+)/;
        let match = elemTextContent.match(regex);
        if (match) {
          return this.calculateAverage(match);
        } else {
          console.error(`Could not parse duration from: ${elemTextContent}`);
        }
      }
    }
    return null;
  }
}
