const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '/config/config.json');

console.info('Loading config from: ', CONFIG_PATH);

const rawdata = fs.readFileSync(CONFIG_PATH);
module.exports = JSON.parse(rawdata);
