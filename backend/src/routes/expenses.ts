import { Router } from 'express';
import { createExpense } from '../handlers/expense';

const route = Router();

route.post('/create', createExpense);

export default route;