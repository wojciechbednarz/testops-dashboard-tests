import { Request, Response, NextFunction } from 'express';

export interface TestRun {
  id: string;
  name: string;
  status: string;
  duration: string | null;
  triggeredAt: string;
}

let testRuns: TestRun[] = [];

export const getTests = (req: Request, res: Response, next: NextFunction): void => {
  res.json(testRuns);
  return;
};

export const getTest = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  const test = testRuns.find(t => t.id === id);
  if (!test) {
    res.status(404).json({ message: `Test with id ${id} not found` });
    return;
  }
  res.json(test);
  return;
};

export const triggerTest = (req: Request, res: Response, next: NextFunction):void => {
  const newTest: TestRun = {
    id: Date.now().toString(),
    name: `Test-${testRuns.length + 1}`,
    status: 'running',
    duration: null,
    triggeredAt: new Date().toISOString()
  };

  testRuns.push(newTest);
  // Log the new test run
  console.log('Test pushed:', newTest);
  console.log('All test runs:', testRuns);

  // Simulate async test result after 5s
  setTimeout(() => {
    newTest.status = Math.random() > 0.5 ? 'passed' : 'failed';
    newTest.duration = `${Math.floor(Math.random() * 10 + 1)}s`;
  }, 5000);

  res.status(202).json({ message: 'Test triggered', test: newTest });
  return;
};