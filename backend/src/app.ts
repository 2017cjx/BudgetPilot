import express from 'express';
import cors from 'cors';
import userRoute from './routes/user';
import errorHandler from './middlewares/error';
import categoryRoute from './routes/category';
import { ErrorResponse } from './utils/errorResponse';
import { authMiddleware } from './middlewares/index';
import expenseRoute from './routes/expenses';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: 'Welcome to BudgetPilot API' }); 
});

app.use('/api/v1/users', userRoute);
app.use(authMiddleware);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/expenses', expenseRoute);

// Error handler should be AFTER all routes but BEFORE the catch-all
app.use(errorHandler);

// Catch-all route for undefined routes should be LAST
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  next(new ErrorResponse('Route Not Found', 404));
});

export default app;