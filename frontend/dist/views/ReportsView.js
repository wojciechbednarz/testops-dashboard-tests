async function fetchResults() {
    try {
        const res = await fetch('http://localhost:3000/api/tests');
        if (!res.ok)
            throw new Error(`HTTP ${res.status}`);
        return await res.json();
    }
    catch (error) {
        console.error('Failed to fetch test results:', error);
        return [];
    }
}
function calculateSummary(results) {
    const summary = {
        total: results.length,
        passed: 0,
        failed: 0,
        running: 0,
        avgDuration: 0,
        recentTests: results.slice(0, 5),
    };
    let totalDuration = 0;
    let durationCount = 0;
    results.forEach(r => {
        if (r.status === 'passed')
            summary.passed++;
        else if (r.status === 'failed')
            summary.failed++;
        else if (r.status === 'running')
            summary.running++;
        if (r.duration != null) {
            const durationNum = parseFloat(r.duration);
            if (!isNaN(durationNum)) {
                totalDuration += durationNum;
                durationCount++;
            }
        }
    });
    summary.avgDuration = durationCount > 0 ? totalDuration / durationCount : 0;
    return summary;
}
export async function renderReports(container) {
    try {
        const results = await fetchResults();
        if (results.length === 0) {
            container.innerHTML = '<div class="no-data"><h2>No test data available</h2><p>Run some tests to see reports.</p></div>';
            return;
        }
        const summary = calculateSummary(results);
        // Clear container
        container.innerHTML = '';
        // Create reports content
        const reportsDiv = document.createElement('div');
        reportsDiv.className = 'reports-container';
        // Summary statistics
        const statsSection = document.createElement('div');
        statsSection.className = 'reports-section';
        statsSection.innerHTML = `
      <h2>Test Execution Summary</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <h3>${summary.total}</h3>
          <p>Total Tests</p>
        </div>
        <div class="stat-card success">
          <h3>${summary.passed}</h3>
          <p>✅ Passed</p>
        </div>
        <div class="stat-card danger">
          <h3>${summary.failed}</h3>
          <p>❌ Failed</p>
        </div>
        <div class="stat-card warning">
          <h3>${summary.running}</h3>
          <p>⏳ Running</p>
        </div>
        <div class="stat-card">
          <h3>${summary.avgDuration.toFixed(2)}s</h3>
          <p>⏱️ Avg Duration</p>
        </div>
        <div class="stat-card">
          <h3>${((summary.passed / summary.total) * 100).toFixed(1)}%</h3>
          <p>📊 Pass Rate</p>
        </div>
      </div>
    `;
        // Recent tests section
        const recentSection = document.createElement('div');
        recentSection.className = 'reports-section';
        recentSection.innerHTML = '<h2>Recent Test Results</h2>';
        const recentList = document.createElement('div');
        recentList.className = 'recent-tests';
        summary.recentTests.forEach(test => {
            const testItem = document.createElement('div');
            testItem.className = `test-item ${test.status}`;
            testItem.innerHTML = `
        <span class="test-name">${test.name}</span>
        <span class="test-status">${test.status}</span>
        <span class="test-duration">${test.duration ? test.duration + 's' : 'N/A'}</span>
        <span class="test-date">${new Date(test.triggered_at).toLocaleDateString()}</span>
      `;
            recentList.appendChild(testItem);
        });
        recentSection.appendChild(recentList);
        reportsDiv.appendChild(statsSection);
        reportsDiv.appendChild(recentSection);
        container.appendChild(reportsDiv);
    }
    catch (error) {
        console.error('Error rendering reports:', error);
        container.innerHTML = '<div class="error"><h2>Error Loading Reports</h2><p>Failed to load reports data. Please try again.</p></div>';
    }
}
