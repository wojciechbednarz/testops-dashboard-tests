"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTestStatusRandomly = generateTestStatusRandomly;
exports.generateTestDurationRandomly = generateTestDurationRandomly;
function generateTestStatusRandomly() {
    const statuses = ['passed', 'failed', 'running'];
    const random = Math.floor(Math.random() * statuses.length);
    return statuses[random];
}
function generateTestDurationRandomly(min = 1, max = 10) {
    const duration = Math.random() * (max - min) + min;
    return duration.toFixed(2);
}
