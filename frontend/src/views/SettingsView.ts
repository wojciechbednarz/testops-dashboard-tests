import {
  createTestSuiteType,
  setLightOrDarkMode,
  ToggleLightDarkMode,
  SettingsTestSuite,
} from "../components/SettingsElements.js";

export function renderSettings(container: HTMLElement): void {
  console.log(window.location.pathname);
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

  const themeButton = document.createElement("button");
  themeButton.textContent = "Toggle Theme";
  themeButton.id = 'theme-button'
  let currentTheme: ToggleLightDarkMode = "light";

  const themeContainer = setLightOrDarkMode(currentTheme);
  themeContainer.id = "theme-box";

  themeButton.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    themeContainer.classList.toggle("light-mode");
    themeContainer.classList.toggle("dark-mode");
    themeContainer.textContent = `Mode: ${currentTheme}`;
  });

  container.appendChild(dropDownLabel);
  container.appendChild(select);
  container.appendChild(outputContainer);
  container.appendChild(themeButton);
  container.appendChild(themeContainer);
}
