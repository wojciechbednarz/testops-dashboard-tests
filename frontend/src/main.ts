// src/main.ts
import { DashboardView } from "./views/DashboardView.js";
import { renderTestRuns } from "./views/TestRunsView.js";
import { renderReports } from "./views/ReportsView.js";
import { renderSettings } from "./views/SettingsView.js";
import { plotResults } from "./views/DataVisualizationView.js";
import { renderLogin } from "./views/LoginView.js";
import { initializeTheme } from "./utils/theme.js";
import { initializeSidebar, setActiveNavLink } from "./utils/sidebar.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Initialize theme on every page
  initializeTheme();
  
  // Initialize sidebar functionality
  initializeSidebar();
  
  // Set active navigation link
  setActiveNavLink();
  
  const path = window.location.pathname;

  // Dashboard (root path or index.html)
  if (path === "/" || path.endsWith("/index.html")) {
    const app = document.getElementById("app");
    if (app) {
      try {
        const dashboardContent = await DashboardView();
        app.innerHTML = "";
        app.appendChild(dashboardContent);
      } catch (err) {
        app.innerHTML = "<p style='color:red'>Failed to load dashboard.</p>";
        console.error("Dashboard error:", err);
      }
    }
  }

  // Test Runs page
  if (path.endsWith("/tests.html")) {
    const container = document.getElementById("test-runs-list");
    if (container) {
      renderTestRuns(container);
    }
  }

  // Reports page
  if (path.endsWith("/reports.html")) {
    const container = document.getElementById("reports");
    if (container) {
      renderReports(container);
    }
  }

  // Settings page
  if (path.endsWith("/settings.html")) {
    const container = document.getElementById("settings");
    if (container) {
      renderSettings(container);
    }
  }

  // Data Visualization page
  if (path.endsWith("/data_visualization.html")) {
    const container = document.getElementById("data-visualization");
    if (container) {
      plotResults(container);
    }
  }

  // Login page
  if (path.endsWith("/login.html")) {
    const container = document.getElementById("login");
    if (container) {
      renderLogin(container);
    }
  }
});