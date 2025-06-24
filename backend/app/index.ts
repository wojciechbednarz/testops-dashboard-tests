import express from 'express';
import testRoutes from './routes/testRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/tests', testRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});