import 'dotenv/config';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(text) {
  if (!text) throw new Error('`text` is required to send a Telegram message');

  if (!TELEGRAM_BOT_TOKEN) throw new Error('Telegram token not set. Set TELEGRAM_BOT_TOKEN env var.');
  if (!TELEGRAM_CHAT_ID) throw new Error('Telegram chat id not set. Set TELEGRAM_CHAT_ID env var.');

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const body = await res.text();
      console.error('Telegram send failed', res.status, body);
      return { ok: false, status: res.status, body };
    }
    console.log('Notification sent!');
    return { ok: true };
  } catch (err) {
    console.error('Telegram error', err);
    return { ok: false, error: String(err) };
  }
}

export default sendTelegramMessage;
