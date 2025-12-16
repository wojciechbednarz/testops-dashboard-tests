import { Pool, QueryResult } from "pg";


export class SQLDatabase {
  private pool: Pool;
  private initialized: Promise<void>;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.RDS_PORT || process.env.DB_PORT || '5432'),
      database: process.env.RDS_DB_NAME || process.env.DB_NAME,
      user: process.env.RDS_USERNAME || process.env.DB_USER,
      password: process.env.RDS_PASSWORD || process.env.DB_PASSWORD,
      max: 20, // maximum number of clients in the pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000, // Increased to 10s for RDS
      // SSL configuration for RDS
      ssl: process.env.DB_HOST && process.env.DB_HOST.includes('rds.amazonaws.com') 
        ? { rejectUnauthorized: false } // For RDS, use SSL but don't verify certificate
        : false // For local development, no SSL
    });

    this.initialized = this.initializeTable();
  }

  private async initializeTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS test_runs (
        id TEXT PRIMARY KEY,
        name TEXT,
        status TEXT,
        duration TEXT,
        triggered_at TEXT
      )
    `;
    
    try {
      await this.pool.query(query);
      console.log('Database table initialized successfully');
    } catch (err) {
      console.error('Error initializing table:', err);
      throw err;
    }
  }

  async insertData(
    id: string,
    name: string,
    status: string,
    duration: string | null,
    triggered_at: string,
    callback: (err: Error | null) => void
  ): Promise<void> {
    await this.initialized; // Wait for table to be created
    
    const query = `
      INSERT INTO test_runs (id, name, status, duration, triggered_at)
      VALUES ($1, $2, $3, $4, $5)
    `;
    
    this.pool.query(query, [id, name, status, duration, triggered_at])
      .then(() => callback(null))
      .catch((err: Error | null) => callback(err));
  }

  async getData(id: string, callback: (err: Error | null, row: any) => void): Promise<void> {
    await this.initialized; // Wait for table to be created
    
    const query = 'SELECT * FROM test_runs WHERE id = $1';
    
    this.pool.query(query, [id])
      .then((result: QueryResult) => {
        callback(null, result.rows[0] || null);
      })
      .catch((err: Error) => callback(err, null));
  }

  async getAllData(callback: (err: Error | null, rows: any[]) => void): Promise<void> {
    await this.initialized; // Wait for table to be created
    
    const query = 'SELECT * FROM test_runs ORDER BY triggered_at DESC';
    
    this.pool.query(query)
      .then((result: QueryResult) => {
        callback(null, result.rows);
      })
      .catch((err: Error) => callback(err, []));
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
