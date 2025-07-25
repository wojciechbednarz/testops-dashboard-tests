"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDashboard = renderDashboard;
// src/views/DashboardView.ts
const StatusBadge_js_1 = require("../components/StatusBadge.js");
function fetchResults() {
    fetch('http://localhost:3000/api/tests')
        .then(res => res.json())
        .then(data => {
        const list = document.querySelector('#testList');
        if (!list) {
            console.error('No element with id "testList" found.');
            return;
        }
        data.forEach((item) => {
            const markup = `<li>${item.name}</li>`;
            list.insertAdjacentHTML('beforeend', markup);
        });
    })
        .catch(error => {
        console.error('Error fetching test results:', error);
    });
}
function renderDashboard(container) {
    const heading = document.createElement('h1');
    heading.textContent = 'Test Run Dashboard';
    const status = 'passed'; // Replace with real data or fetch result
    const badge = (0, StatusBadge_js_1.createStatusBadge)(status);
    fetchResults();
    container.appendChild(heading);
    container.appendChild(badge);
}
