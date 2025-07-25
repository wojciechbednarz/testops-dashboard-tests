// src/components/SettingsElements.ts
export function createTestSuiteType(testType) {
    const container = document.createElement('div');
    container.classList.add('test-type');
    const label = document.createElement('span');
    label.textContent = testType;
    container.appendChild(label);
    container.classList.add(`test-type-${testType}`);
    return container;
}
export function setLightOrDarkMode(modeType) {
    const container = document.createElement('div');
    container.textContent = `Mode: ${modeType}`;
    container.classList.toggle(`${modeType}-mode`);
    return container;
}
