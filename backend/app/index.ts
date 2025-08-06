import express from 'express';
import cors from 'cors';
import testRoutes from './routes/testRoutes';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/tests', testRoutes);

// Serve static files (e.g., JS, CSS) from frontend build directory
app.use('/static', express.static(path.join(__dirname, '../../frontend/dist')));

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.get('/tests.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/tests.html'));
});

app.get('/reports.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/reports.html'));
});

app.get('/settings.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/settings.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/login.html'));
});

app.get('/data_visualization.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/data_visualization.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
