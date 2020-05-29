"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
exports.defaultOptions = {
    env: ['development', 'dev']
};
exports.runInValidEnvironment = (env, options = exports.defaultOptions) => {
    return options.env.includes(env);
};
exports.isEnable = (req, env, options = exports.defaultOptions) => {
    return (exports.runInValidEnvironment(env, options) &&
        req.header('X-Expresso-Enable') &&
        req.path.indexOf(constants_1.EXPRESSO_STATIC_PATH) <= -1);
};
//# sourceMappingURL=index.js.map