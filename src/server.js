import express from 'express';
import path from 'path';
import { tryComputeArbs } from './app.js';
import checkAndSendAlerts from './alerts.js';

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

    try {
      checkAndSendAlerts(latestArb);
    } catch (err) {
      console.error('Error while checking alerts', err);
    }
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
