const data = require('./data.js');
const comands = require('./comands.js');


const mainFlow = function (bot) {
    bot.on('message', function (msg) {
        const userId = msg.from.id;
        const userData = {
            id: userId,
            role: null,
            name: null,
            menuPath: [],
            apartments: [],
        };

        var mainMenu = null;
        var currentMenu = null;

        const resolveMenu = function () {
            currentMenu = mainMenu;
            if (!userData.menuPath || userData.menuPath.length == 0) {
                return;
            }
            userData.menuPath.forEach(element => {
                currentMenu = currentMenu.comands[element];
            });
        }
        const setMenu = function () {
            switch (userData.role) {
                case 'admin':
                    mainMenu = comands.adminRole
                    break;
                default:
                    mainMenu = comands.noRole
                    break;
            }
        }
        const updateMenu = function () {
            setMenu();
            resolveMenu();
            data.updateUser(userId, userData);
            if (!currentMenu) {
                return;
            }
            bot.sendMessage(msg.chat.id, currentMenu.name || 'undefined', {
                reply_markup: {
                    keyboard: currentMenu.keyboard || [[]]
                }
            });
        }
        data.getUser(userId).then((user) => {
            Object.assign(userData, user);
            if (mainMenu == null) {
                setMenu();
                resolveMenu();
            }
            if (currentMenu.comands) {
                const selectedComand = currentMenu.comands[msg.text];
                if (selectedComand) {
                    if (typeof selectedComand.action === 'string') {
                        switch (selectedComand.action) {
                            case 'back':
                                userData.menuPath.splice(-1, 1);
                                updateMenu();
                                break;
                            case 'main':
                                userData.menuPath = [];
                                updateMenu();
                                break;
                            default: console.log('unknown comand');
                        }
                    } else if (typeof selectedComand.action === 'function') {
                        selectedComand.action(bot, msg, userData)
                            .then((updatedData) => {
                                Object.assign(userData, updatedData);
                                updateMenu();
                            });
                    } else {
                        userData.menuPath.push(msg.text);
                        updateMenu();
                        return;

                    }
                }
            }
            updateMenu();
        })
    });
};

module.exports = { mainFlow: mainFlow };