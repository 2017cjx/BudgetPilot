import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: 'Welsome to BudgetPilot API' })
});

export default app;