export type TestStatus = 'passed' | 'failed' | 'running';
export declare function generateTestStatusRandomly(): TestStatus;
export declare function generateTestDurationRandomly(min?: number, max?: number): string;
