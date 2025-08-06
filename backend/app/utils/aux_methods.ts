export type TestStatus = 'passed' | 'failed' | 'running';

export function generateTestStatusRandomly(): TestStatus {
    const statuses: TestStatus[] = ['passed', 'failed', 'running'];
    const random = Math.floor(Math.random() * statuses.length);
    return statuses[random];
}

export function generateTestDurationRandomly(min: number = 1, max: number = 10): string {
    const duration = Math.random() * (max - min) + min;
    return duration.toFixed(2);
}