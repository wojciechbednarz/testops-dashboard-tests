"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLDatabase = void 0;
const sqlite3 = require("sqlite3").verbose();
class SQLDatabase {
    constructor() {
        this.db = new sqlite3.Database("./testops.db");
    }
    insertData(id, name, status, duration, triggeredAt, callback) {
        this.db.serialize(() => {
            this.db.run("CREATE TABLE IF NOT EXISTS test_runs (id TEXT PRIMARY KEY, name TEXT, status TEXT, duration TEXT, triggeredAt TEXT)", (err) => {
                if (err) {
                    callback(err);
                    return;
                }
                const stmt = this.db.prepare("INSERT INTO test_runs (id, name, status, duration, triggeredAt) VALUES (?, ?, ?, ?, ?)");
                stmt.run(id, name, status, duration, triggeredAt, (err) => {
                    stmt.finalize();
                    callback(err);
                });
            });
        });
    }
    getData(id, callback) {
        this.db.serialize(() => {
            this.db.get("SELECT * FROM test_runs WHERE id = ?", [id], (err, row) => {
                callback(err, row);
            });
        });
    }
}
exports.SQLDatabase = SQLDatabase;
