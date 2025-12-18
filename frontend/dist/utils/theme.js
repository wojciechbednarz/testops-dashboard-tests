// src/utils/theme.ts
const THEME_STORAGE_KEY = 'testops-theme';
export function getStoredTheme() {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return (stored === 'dark' || stored === 'light') ? stored : 'light';
}
export function setStoredTheme(theme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}
export function applyTheme(theme) {
    const body = document.body;
    // Remove existing theme classes
    body.classList.remove('light-theme', 'dark-theme');
    // Add the new theme class
    body.classList.add(`${theme}-theme`);
    // Store the preference
    setStoredTheme(theme);
}
export function initializeTheme() {
    const theme = getStoredTheme();
    applyTheme(theme);
}
export function toggleTheme() {
    const currentTheme = getStoredTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    return newTheme;
}
