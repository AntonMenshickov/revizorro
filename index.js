const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.js');
const flows = require('./flows.js');


var bot = new TelegramBot(config.TOKEN, { polling: true });


flows.mainFlow(bot);

bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    console.log(callbackQuery);
});