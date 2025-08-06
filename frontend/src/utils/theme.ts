// src/utils/theme.ts

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'testops-theme';

export function getStoredTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return (stored === 'dark' || stored === 'light') ? stored : 'light';
}

export function setStoredTheme(theme: Theme): void {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function applyTheme(theme: Theme): void {
  const body = document.body;
  
  // Remove existing theme classes
  body.classList.remove('light-theme', 'dark-theme');
  
  // Add the new theme class
  body.classList.add(`${theme}-theme`);
  
  // Store the preference
  setStoredTheme(theme);
}

export function initializeTheme(): void {
  const theme = getStoredTheme();
  applyTheme(theme);
}

export function toggleTheme(): Theme {
  const currentTheme = getStoredTheme();
  const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  return newTheme;
}
