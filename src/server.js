import express from 'express';
import path from 'path';
import { tryComputeArbs } from './app.js';

const app = express();
const port = 4000;

let arbs = {
  timestamp: new Date(),
  arbs: [],
};

const clientBuildPath = path.resolve('client/build');
app.use(express.static(clientBuildPath));

async function computePayload() {
  const latestArb = await tryComputeArbs();
  if (latestArb) {
    arbs = {
      timestamp: new Date(),
      arbs: await tryComputeArbs(),
    };
  }
}
computePayload();

// Recompute arbs every minute
setInterval(computePayload, 60 * 1000);

app.get('/api/arbs', async (req, res) => {
  res.json(arbs);
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
