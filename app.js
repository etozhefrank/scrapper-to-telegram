// TODO: Разбить на микросервисы (Redis)
const TelegramBot = require('node-telegram-bot-api');
const TOKEN = process.env.TELEGRAM_TOKEN;
const express = require('express');
const app = express();
const bot = new TelegramBot(TOKEN, { polling: true });
const db= require('./db');
const pg = require('pg');
require('dotenv').config()

const connString = process.env.PGdata
const pgClient = new pg.Client(connString)
pgClient.connect();
const lists = pgClient.query('LISTEN new_testevent');
async function MsqTG(){
    const posts = await db.query('select content, urlpost from scrapper ORDER BY id DESC')
    const telegramMsg = `${posts.rows[0].content}
${posts.rows[0].urlpost}`
    pgClient.on('notification', (msg) => {
        const chatId = process.env.ChatID
        bot.sendMessage(chatId, telegramMsg)
    })
}
MsqTG()

const port = 5000;
app.listen(port, () => {
    console.log(`Express server is listening on ${port}`);
})