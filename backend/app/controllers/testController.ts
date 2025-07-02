import { Request, Response, NextFunction } from 'express';
import { SQLDatabase } from '../config/db';

export interface TestRun {
  id: string;
  name: string;
  status: string;
  duration: string | null;
  triggeredAt: string;
}

let testRuns: TestRun[] = [];

export const getTests = (req: Request, res: Response, next: NextFunction): void => {
  const sqlDatabase = new SQLDatabase();
  sqlDatabase.db.all("SELECT * FROM test_runs", (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Database error', error: err.message });
      return;
    }
    res.json(rows);
  });
};

export const getTest = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  const sqlDatabase = new SQLDatabase();
  sqlDatabase.getData(id, (err: Error | null, row: any) => {
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

export const triggerTest = (req: Request, res: Response, next: NextFunction): void => {
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


  const sqlDatabase = new SQLDatabase();
  sqlDatabase.insertData(
    newTest.id,
    newTest.name,
    newTest.status,
    newTest.duration,
    newTest.triggeredAt,
    (err: Error | null) => {
      if (err) {
        res.status(500).json({ message: 'Database error', error: err.message });
        return;
      }
      res.status(202).json({ message: 'Test triggered', test: newTest });
    }
  );
};