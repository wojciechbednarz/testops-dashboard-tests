"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerTest = exports.getTest = exports.getTests = void 0;
const db_1 = require("../config/db");
let testRuns = [];
const getTests = (req, res, next) => {
    const sqlDatabase = new db_1.SQLDatabase();
    sqlDatabase.db.all("SELECT * FROM test_runs", (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Database error', error: err.message });
            return;
        }
        res.json(rows);
    });
};
exports.getTests = getTests;
const getTest = (req, res, next) => {
    const { id } = req.params;
    const sqlDatabase = new db_1.SQLDatabase();
    sqlDatabase.getData(id, (err, row) => {
        if (err) {
            res.status(500).json({ message: 'Database error', error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: `Test with id ${id} not found` });
            return;
        }
        res.json(row);
    });
};
exports.getTest = getTest;
const triggerTest = (req, res, next) => {
    const newTest = {
        id: Date.now().toString(),
        name: `Test-${Math.floor(Math.random() * 10000)}`,
        status: 'running',
        duration: null,
        triggeredAt: new Date().toISOString()
    };
    testRuns.push(newTest);
    console.log('Test pushed:', newTest);
    console.log('All test runs:', testRuns);
    const sqlDatabase = new db_1.SQLDatabase();
    sqlDatabase.insertData(newTest.id, newTest.name, newTest.status, newTest.duration, newTest.triggeredAt, (err) => {
        if (err) {
            res.status(500).json({ message: 'Database error', error: err.message });
            return;
        }
        res.status(202).json({ message: 'Test triggered', test: newTest });
    });
};
exports.triggerTest = triggerTest;
