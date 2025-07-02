// src/main.ts
import { renderDashboard } from './views/DashboardView';

const app = document.getElementById('app');
if (app) {
  renderDashboard(app);
}