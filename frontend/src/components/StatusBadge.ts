// src/components/StatusBadge.ts

export type TestStatus = 'passed' | 'failed' | 'running';

export function createStatusBadge(status: TestStatus): HTMLElement {
  const badge = document.createElement('div');
  badge.classList.add('status-badge');

  switch (status) {
    case 'passed':
      badge.textContent = '✅ Passed';
      badge.classList.add('status-pass');
      break;
    case 'failed':
      badge.textContent = '❌ Failed';
      badge.classList.add('status-fail');
      break;
    case 'running':
      badge.textContent = '⏳ Running';
      badge.classList.add('status-running');
      break;
  }

  return badge;
}
