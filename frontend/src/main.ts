// src/main.ts
import { renderTestRuns } from "./views/TestRunsView.js";
import { renderReports } from "./views/ReportsView.js";
// import { renderSettings } from "./views/SettingsView.js";

const path = window.location.pathname;

if (path.endsWith("/tests.html") || path === "/") {
  const container = document.getElementById("testList");
  if (container) {
    renderTestRuns(container);
  }
}

if (path.endsWith("/reports.html")) {
  const container = document.getElementById("reports");
  if (container) {
    renderReports(container);
  }
}

// if (path.endsWith("/settings.html")) {
//   const container = document.getElementById("settings");
//   if (container) {
//     renderSettings(container);
//   }
// }