import express from 'express';
import path from 'path';
import { tryComputeArbs } from './app.js';

let arbs = {
  timestamp: new Date(),
  arbs: [],
};

async function computePayload() {
  const latestArb = await tryComputeArbs();
  if (latestArb) {
    arbs = {
      timestamp: new Date(),
      arbs: latestArb,
    };
  }
}
computePayload();

setInterval(computePayload, 45 * 1000);

const app = express();
const clientBuildPath = path.resolve('client/build');
app.use(express.static(clientBuildPath));

app.get('/api/arbs', async (req, res) => {
  res.json(arbs);
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
