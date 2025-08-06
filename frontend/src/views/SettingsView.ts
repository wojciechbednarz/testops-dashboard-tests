import {
  createTestSuiteType,
  SettingsTestSuite,
} from "../components/SettingsElements.js";
import { toggleTheme, getStoredTheme } from "../utils/theme.js";

export function renderSettings(container: HTMLElement): void {
  // Test Suite Selection
  const testSuiteSection = document.createElement("div");
  testSuiteSection.className = "settings-section";
  
  const dropDownLabel = document.createElement("label");
  dropDownLabel.textContent = "Select Test Suite:";
  dropDownLabel.htmlFor = "test-suite-select";

  const select = document.createElement("select");
  select.id = "test-suite-select";

  const testTypes: SettingsTestSuite[] = ["Smoke", "Regression", "Performance"];

  testTypes.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    select.appendChild(option);
  });

  const outputContainer = document.createElement("div");
  outputContainer.id = "output";

  // Handle dropdown change
  select.addEventListener("change", (e) => {
    const selectedType = (e.target as HTMLSelectElement)
      .value as SettingsTestSuite;
    const rendered = createTestSuiteType(selectedType);
    outputContainer.innerHTML = ""; // clear previous
    outputContainer.appendChild(rendered);
  });

  testSuiteSection.appendChild(dropDownLabel);
  testSuiteSection.appendChild(select);
  testSuiteSection.appendChild(outputContainer);

  // Theme Toggle Section
  const themeSection = document.createElement("div");
  themeSection.className = "settings-section";
  
  const themeLabel = document.createElement("h3");
  themeLabel.textContent = "Theme Settings";
  
  const currentTheme = getStoredTheme();
  const themeStatus = document.createElement("p");
  themeStatus.textContent = `Current theme: ${currentTheme}`;
  themeStatus.id = "theme-status";

  const themeButton = document.createElement("button");
  themeButton.textContent = `Switch to ${currentTheme === 'light' ? 'Dark' : 'Light'} Mode`;
  themeButton.id = 'theme-toggle-button';
  themeButton.className = 'theme-button';

  themeButton.addEventListener("click", () => {
    const newTheme = toggleTheme();
    themeStatus.textContent = `Current theme: ${newTheme}`;
    themeButton.textContent = `Switch to ${newTheme === 'light' ? 'Dark' : 'Light'} Mode`;
  });

  themeSection.appendChild(themeLabel);
  themeSection.appendChild(themeStatus);
  themeSection.appendChild(themeButton);

  container.appendChild(testSuiteSection);
  container.appendChild(themeSection);
}
