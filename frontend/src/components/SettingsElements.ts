// src/components/SettingsElements.ts

export type SettingsTestSuite = 'Smoke' | 'Regression' | 'Performance'


export function createTestSuiteType(testType: SettingsTestSuite): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('test-type');

    const label = document.createElement('span');
    label.textContent = testType
    container.appendChild(label);
    container.classList.add(`test-type-${testType}`);
    return container;
}


export type ToggleLightDarkMode = 'light' | 'dark'

export function setLightOrDarkMode(modeType: ToggleLightDarkMode) {
    const container = document.createElement('div');
    container.textContent = `Mode: ${modeType}`;
    container.classList.toggle(`${modeType}-mode`);
    return container;
}