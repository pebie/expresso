"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const server_1 = require("./views/server");
const http_1 = __importDefault(require("./interceptors/http"));
const constants_1 = require("./constants");
let interceptor;
const middleware = (app, options = config_1.defaultOptions) => {
    handleStatic(app);
    return (req, res, next) => {
        if (!config_1.isEnable(req, process.env.NODE_ENV || '', options))
            return next();
        if (!interceptor)
            interceptor = new http_1.default();
        const send = res.send;
        res.send = function (body) {
            // TODO append these to the final data (this is the original request info)
            // res.getHeaders() => (original response header before sending HTML)
            // body (original => response body before sending HTML)
            const originalRes = res.req;
            res.set('Content-Type', 'text/html');
            res.status(200);
            send.call(this, server_1.handleRender(Object.assign(Object.assign({}, originalRes), { data: body }), interceptor.data));
            interceptor.data = [];
        };
        res.json = function (body) {
            const originalRes = res.req;
            res.set('Content-Type', 'text/html');
            res.status(200);
            send.call(this, server_1.handleRender(Object.assign(Object.assign({}, originalRes), { data: body }), interceptor.data));
            interceptor.data = [];
        };
        return next();
    };
};
const handleStatic = (app) => {
    const publicPath = path_1.default.join(__dirname, constants_1.EXPRESSO_PUBLIC_PATH);
    const middlewareStatic = express_1.default.static(publicPath, {
        index: false
    });
    app.use(constants_1.EXPRESSO_STATIC_PATH, middlewareStatic);
};
exports.default = {
    middleware
};
//# sourceMappingURL=index.js.map