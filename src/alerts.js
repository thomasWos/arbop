import sendTelegramMessage from './telegram.js';

const ALERT_THRESHOLD = 0.2;
const ALERT_COOLDOWN_MINUTES = 60;
const ALERT_COOLDOWN_MS = ALERT_COOLDOWN_MINUTES * 60 * 1000;
const lastAlertMap = new Map();

const isTarget = (name) => name && name.includes('ETH.axl') && name.includes('wstETH');

export async function checkAndSendAlerts(latestArb) {
  if (!latestArb || !Array.isArray(latestArb)) return;

  for (const arb of latestArb) {
    if (!arb || !arb.name) continue;
    if (isTarget(arb.name) && arb.arb > ALERT_THRESHOLD) {
      const lastSent = lastAlertMap.get(arb.name) || 0;
      if (Date.now() - lastSent > ALERT_COOLDOWN_MS) {
        const msg = `Arb alert: ${arb.name}\nArb: ${arb.arb} (> ${ALERT_THRESHOLD})\nDex: ${arb.dex || 'unknown'}${
          arb.dexUrl ? `\n${arb.dexUrl}` : ''
        }`;
        try {
          await sendTelegramMessage(msg);
          lastAlertMap.set(arb.name, Date.now());
        } catch (err) {
          console.error('Failed to send Telegram alert', err);
        }
      }
    }
  }
}

export default checkAndSendAlerts;
