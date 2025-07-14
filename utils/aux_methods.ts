export function generateTestStatusRandomly() {
    const statuses = ['passed', 'failed', 'running']
    const random = Math.floor(Math.random() * statuses.length)
    return statuses[random]
}

export function generateTestDurationRandomly(min=1, max=10): string {
    const duration = Math.random() * (max - min) + min;
    return duration.toFixed(2);
}