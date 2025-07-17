export class DashboardPage {

    constructor(page) {
        this.page = page;
        this.baseUrl = 'http://localhost:3000/';
        this.page_title = '.testops-title';
        this.project_logo = 'img[alt="Project logo"]'
    }


    async goToDashboardPage() {
        await this.page.goto(this.baseUrl);
    }
}