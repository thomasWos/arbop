import express from 'express';
import { tryComputeArbs } from './app.js';

const app = express();
const port = 3000;

let arbs;
async function computePayload() {
  arbs = {
    timestamp: new Date(),
    arbs: await tryComputeArbs(),
  };
}
computePayload();

// Recompute arbs every minute
setInterval(computePayload, 60 * 1000);

app.get('/arbs', async (req, res) => {
  res.json(arbs);
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
