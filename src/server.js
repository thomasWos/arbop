import express from 'express';
import { sortedArbs } from './app.js';

const app = express();
const port = 3000;

app.get('/arbs', async (req, res) => {
  res.json(sortedArbs);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
