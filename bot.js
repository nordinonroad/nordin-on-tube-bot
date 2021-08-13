require('dotenv').config();
const { Telegraf } = require('telegraf');

const axios = require('axios');

const BOT_TOKEN = process.env.BOT_TOKEN;
const YOUTUBE_KEY = process.env.YOUTUBE_KEY;
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Bite it ${ctx.from.first_name}, you scum!💀`));

bot.on('text', async (ctx) => {
  try {
    const response = await axios(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_KEY}&type=video&part=snippet&maxResults=1&q=${encodeURIComponent(ctx.message.text)}`);
    const data = response.data.items[0].id.videoId;
    ctx.reply(`https://www.youtube.com/watch?v=${data}`);
  } catch (err) {
    ctx.reply(`Bite it ${ctx.from.first_name}, invalid request 💩`);
  }
});

bot.launch();
