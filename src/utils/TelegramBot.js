import { Telegraf } from 'telegraf';
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

export function sendTelegramMsg(msg) {
  bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, msg)
}