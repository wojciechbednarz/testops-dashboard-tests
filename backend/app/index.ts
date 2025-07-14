import express from 'express';
import testRoutes from './routes/testRoutes';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API routes
app.use('/api/tests', testRoutes);

// Serve static files (e.g., JS, CSS) from frontend build directory
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Serve index.html on root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
