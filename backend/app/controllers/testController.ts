import { Request, Response, NextFunction } from 'express';
import { SQLDatabase } from '../config/db';
import { generateTestStatusRandomly,generateTestDurationRandomly } from '../utils/aux_methods';

export interface TestRun {
  id: string;
  name: string;
  status: string;
  duration: string | null;
  triggered_at: string;
}

export const getTests = (req: Request, res: Response, next: NextFunction): void => {
  const sqlDatabase = new SQLDatabase();
  sqlDatabase.getAllData((err: Error | null, rows: any[]) => {
    if (err) {
      res.status(500).json({ message: 'Database error', error: err.message });
      return;
    }
    res.json(rows || []);
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
  const newTest: TestRun = {
    id: Date.now().toString(),
    name: `Test-${Math.floor(Math.random() * 10000)}`,
    status: generateTestStatusRandomly(),
    duration: generateTestDurationRandomly(),
    triggered_at: new Date().toISOString()
  };

  console.log('Test triggered:', newTest);

  const sqlDatabase = new SQLDatabase();
  sqlDatabase.insertData(
    newTest.id,
    newTest.name,
    newTest.status,
    newTest.duration,
    newTest.triggered_at,
    (err: Error | null) => {
      if (err) {
        res.status(500).json({ message: 'Database error', error: err.message });
        return;
      }
      res.status(202).json({ message: 'Test triggered', test: newTest });
    }
  );
};