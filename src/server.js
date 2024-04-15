import express from 'express';
import path from 'path';
import cors from 'cors';
import { tryComputeArbs } from './app.js';

// Init
let arbs = {
  timestamp: new Date(),
  arbs: [],
};

const app = express();
const port = 3000;

// Use the cors middleware
app.use(
  cors({
    origin: 'http://localhost:3001', // Allow requests from the React development server
  })
);

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

app.get('/arbs', async (req, res) => {
  res.json(arbs);
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
