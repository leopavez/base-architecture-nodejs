let config = null;
let context = null;

const getConfiguration = () => {
    const env = process.env.NODE_ENV;
    const cfg = require(`./config.js`);
    config = cfg;
    config.env = env;
    return config;
};

const getContext = () => {
    context = require('../../context');
    return context;
};

module.exports.config = getConfiguration();
module.exports.context = getContext();