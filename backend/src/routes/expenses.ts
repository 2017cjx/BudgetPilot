import { Router } from 'express';
import { createExpense, getAllExpenses } from '../handlers/expense';

const route = Router();

route.post('/create', createExpense);
route.get('/', getAllExpenses);

export default route;