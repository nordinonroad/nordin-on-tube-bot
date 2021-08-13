require('dotenv').config();
const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');

const BOT_TOKEN = process.env.BOT_TOKEN;
const YOUTUBE_KEY = process.env.YOUTUBE_KEY;
const bot = new Telegraf(BOT_TOKEN);


// async function getData(search) {
//   const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_KEY}&type=video&part=snippet&maxResults=1&q=${search}`);
//   const data = await response.json();
//   console.log(data.items[0].id.videoId);
// }
// getData('we blew it at some point');

//https://www.googleapis.com/youtube/v3/search?key=AIzaSyDMsA3X-mld6EVd1z_7SGDIMFXQNiD8gn8&type=video&part=snippet&maxResults=1&q=polar

bot.start((ctx) => ctx.reply(`Bite it ${ctx.from.first_name}, you scum!💀`));
bot.on('text', async (ctx) => {
  try {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_KEY}&type=video&part=snippet&maxResults=1&q=${ctx.message.text}`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  const data = await response.json();
  const dataParse = data.items[0].id.videoId;
  ctx.reply(`https://www.youtube.com/watch?v=${dataParse}`);
  } catch {
    ctx.reply(`Bite it ${ctx.from.first_name}, invalid request 💩`);
  }
});



bot.launch();
