"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/main.ts
const DashboardView_js_1 = require("./views/DashboardView.js");
const app = document.getElementById('testList');
if (app) {
    (0, DashboardView_js_1.renderDashboard)(app);
}
