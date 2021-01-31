const data = require('./data.js');

const awaitMessageFromUserById = (userId, callback) => (msg, matches) => msg.from.id == userId ? callback(msg, matches) : null;

const actionRegisterAdmin = function (bot, msg, userData) {
    return new Promise((res, rej) => {
        bot.sendMessage(msg.chat.id, 'Введите название фирмы:');
        const onNameChoosen = function (msg) {
            if (msg.text.length < 3) {
                bot.sendMessage(msg.chat.id, 'Минимальная длина 3 символа, введите еще раз: ');
                return bot.once('message', awaitMessageFromUserById(userData.id, onNameChoosen));
            }
            userData.userId = msg.from.id;
            userData.role = 'admin';
            userData.name = msg.text;
            data.addUser(userData)
            .then(() => {
                bot.sendMessage(msg.chat.id, 'Добро пожаловать, ' + msg.text);
                res(userData);
            });
        }
        bot.once('message', awaitMessageFromUserById(userData.id, onNameChoosen));
    });
}

module.exports = {
    actionRegisterAdmin: actionRegisterAdmin
}