"use strict";
// src/components/StatusBadge.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStatusBadge = createStatusBadge;
function createStatusBadge(status) {
    const badge = document.createElement('div');
    badge.classList.add('status-badge');
    switch (status) {
        case 'passed':
            badge.textContent = '✅ Passed';
            badge.classList.add('status-pass');
            break;
        case 'failed':
            badge.textContent = '❌ Failed';
            badge.classList.add('status-fail');
            break;
        case 'running':
            badge.textContent = '⏳ Running';
            badge.classList.add('status-running');
            break;
    }
    return badge;
    console.log();
}
