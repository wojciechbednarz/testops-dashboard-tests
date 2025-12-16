import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import testRoutes from './routes/testRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/tests', testRoutes);

// Root endpoint (for ELB health checks)
app.get('/', (req, res) => {
  res.json({ 
    message: 'TestOps Backend API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      tests: '/api/tests'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
