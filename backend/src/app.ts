import express from 'express';
import cors from 'cors';
import userRoute from './routes/user';
import errorHandler from './middlewares/error';
import categoryRoute from './routes/category';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: 'Welsome to BudgetPilot API' })
});

app.use('/api/v1/users', userRoute);
app.use('/api/v1/categories', categoryRoute);

// Catch-all route for undefined routes
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

export default app;