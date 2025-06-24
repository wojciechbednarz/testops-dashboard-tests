import { TestRun } from "../controllers/testController";
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:')

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS test_runs (id TEXT PRIMARY KEY, name TEXT, status TEXT, duration TEXT, triggeredAt TEXT)', (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table created successfully');
        }
    });

    const stmt = db.prepare('INSERT INTO test_runs (id, name, status, duration, triggeredAt) VALUES (?, ?, ?, ?, ?)');
    for (let i = 0; i < 10; i++) {
        stmt.run(Date.now().toString() + i, `Test-${i + 1}`, 'running', null, new Date().toISOString());
    };
    stmt.finalize((err: Error | null) => {
        if (err) {
            console.error('Error inserting data:', err.message);
        } else {
            console.log('Data inserted successfully');
        }
    });

    db.each('SELECT * FROM test_runs', (err: Error | null, row: TestRun) => {
        if (err) {
            console.error('Error fetching data:', err.message);
        } else {
            console.log(row);
        }
    });
});