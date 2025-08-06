import { Database } from "sqlite3";
const sqlite3 = require("sqlite3").verbose();

export class SQLDatabase {
  db: Database;

  constructor() {
    this.db = new sqlite3.Database("./testops.db");
    this.initializeTable();
  }

  private initializeTable(): void {
    this.db.run(
      "CREATE TABLE IF NOT EXISTS test_runs (id TEXT PRIMARY KEY, name TEXT, status TEXT, duration TEXT, triggeredAt TEXT)"
    );
  }

  insertData(id: string, name: string, status: string, duration: string | null, triggeredAt: string, callback: (err: Error | null) => void) {
    const stmt = this.db.prepare(
      "INSERT INTO test_runs (id, name, status, duration, triggeredAt) VALUES (?, ?, ?, ?, ?)"
    );
    stmt.run(id, name, status, duration, triggeredAt, (err: Error | null) => {
      stmt.finalize();
      callback(err);
    });
  }

  getData(id: string, callback: (err: Error | null, row: any) => void) {
    this.db.get(
      "SELECT * FROM test_runs WHERE id = ?",
      [id],
      (err: Error | null, row: any) => {
        callback(err, row);
      }
    );
  }

  getAllData(callback: (err: Error | null, rows: any[]) => void) {
    this.db.all(
      "SELECT * FROM test_runs ORDER BY triggeredAt DESC",
      (err: Error | null, rows: any[]) => {
        callback(err, rows);
      }
    );
  }

  close(): void {
    this.db.close();
  }
}