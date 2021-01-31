const keyboards = require('./keyboards.js');
const actions = require('./actions.js');

const noRole = {
    name: 'Кто вы?',
    comands: {
        'Я владелец фирмы': { action: actions.actionRegisterAdmin },
        'Я сотрудник фирмы': { action: null },
    },
    keyboard: keyboards.registerKeyboard,
};

const adminRole = {
    name: 'Главное меню',
    comands: {
        'Квартиры': {
            name: 'Квартиры',
            comands: {
                'Добавить': {
                    name: 'Добавить квартиру',
                    action: null,
                    comands: {
                        'Отмена': { action: 'back' },
                    },
                    keyboard: [[{ text: 'Отмена' }]]
                },
                '< Назад': { action: 'back' },
                'Главное меню': { action: 'main' },
            },
            keyboard: keyboards.apartamentsKeyboard
        },
        'Чек-листы': {
            name: 'Чек-листы',
            comands: {
                'Добавить': {
                    name: 'Добавить чек-лист',
                    action: null,
                    comands: {
                        'Отмена': { action: 'back' },
                    },
                    keyboard: [[{ text: 'Отмена' }]]
                },
                '< Назад': { action: 'back' },
                'Главное меню': { action: 'main' },
            },
            keyboard: keyboards.apartamentsKeyboard
        },
        'Сотрудники': {
            name: 'Сотрудники',
            comands: {
                'Добавить': {
                    name: 'Добавить сотрудника',
                    action: null,
                    comands: {
                        'Отмена': { action: 'back' },
                    },
                    keyboard: [[{ text: 'Отмена' }]]
                },
                '< Назад': { action: 'back' },
                'Главное меню': { action: 'main' },
            },
            keyboard: keyboards.apartamentsKeyboard
        },
        'Уборки': {
            name: 'Уборки',
            comands: {
                'Добавить': {
                    name: 'Добавить уборку',
                    action: null,
                    comands: {
                        'Отмена': { action: 'back' },
                    },
                    keyboard: [[{ text: 'Отмена' }]]
                },
                '< Назад': { action: 'back' },
                'Главное меню': { action: 'main' },
            },
            keyboard: keyboards.apartamentsKeyboard
        },
        'Личный кабинет': {
            name: 'Личный кабинет',
            comands: {
                'Отмена': { action: 'back' },
            },
            keyboard: [[{ text: 'Отмена' }]]
        },
    },
    keyboard: keyboards.adminMainMenu,
}

module.exports = {
    noRole: noRole,
    adminRole: adminRole,
}