// src/components/StatusBadge.ts

export type TestStatus = 'passed' | 'failed' | 'running';

export function createStatusBadge(status: TestStatus): HTMLElement {
  const badge = document.createElement('span');
  badge.classList.add('status-badge');

  switch (status) {
    case 'passed':
      badge.textContent = 'Passed';
      badge.classList.add('passed');
      break;
    case 'failed':
      badge.textContent = 'Failed';
      badge.classList.add('failed');
      break;
    case 'running':
      badge.textContent = 'Running';
      badge.classList.add('running');
      break;
  }

  return badge;
}
