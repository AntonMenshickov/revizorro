const registerKeyboard = [
    [{ text: 'Я владелец фирмы' }],
    [{ text: 'Я сотрудник фирмы' }],
]

const adminMainMenu = [
    [{ text: 'Квартиры' }, { text: 'Чек-листы' }],
    [{ text: 'Сотрудники' }, { text: 'Уборки' }],
    [{ text: 'Личный кабинет' }]
]

const apartamentsKeyboard = [
    [{ text: 'Добавить' }],
    [{ text: '< Назад' }, { text: 'Главное меню' }],
]

module.exports = {
    registerKeyboard: registerKeyboard,
    adminMainMenu: adminMainMenu,
    apartamentsKeyboard: apartamentsKeyboard,
}