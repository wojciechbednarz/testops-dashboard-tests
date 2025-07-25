# TestOps Dashboard Tests

**TestOps Dashboard Tests** is a unified framework that combines automated testing and data visualization to help QA and DevOps teams monitor, analyze, and report on testing pipelines in real-time. It is built with a modular architecture including a Node.js backend, a TypeScript-powered frontend, and automation powered by Playwright.

---

## Project Overview

This project aims to provide a **centralized dashboard** for visualizing test execution results, tracking trends over time, and integrating test reports into CI/CD workflows. It also supports both **API and GUI testing** using Playwright.

---

## Key Features

- Automated **GUI and API testing** with Playwright
- Interactive **charts** using Observable Plot
- Clean and intuitive frontend with modular navigation
- Test result persistence using **SQLite**
- Prettier formatting for consistent code styling
- Auto-reload backend via **nodemon**
- RESTful backend built with Express.js
- Integration with **Allure**, **Prometheus**, **Grafana**, and **GitHub Actions**

---

## Tech Stack

### Backend (`testops-dashboard-tests`)
- Node.js
- Express 5
- TypeScript
- SQLite3
- Playwright (`@playwright/test`)
- Observable Plot

### Frontend (`frontend`)
- TypeScript
- Observable Plot
- HTML/CSS

### Dev Tools
- Nodemon
- ts-node / ts-node-dev
- Prettier
- cpx (asset copying)

---

## Playwright Testing

Playwright is used for both API and GUI tests. Tests are organized and can be run locally or integrated with CI pipelines.

### Example usage:

```bash
npx playwright test
```

Then, if Allure is installed, use:
```bash
allure generate allure-results --clean -o allure-report
allure open allure-report
```

### Build the application
```bash
npm run build
```

### Run the app
```bash
npm run dev
```

To copy static files from stc to dist:
```
"build": "tsc -p . && cpx \"static/**/*\" dist/static",
```