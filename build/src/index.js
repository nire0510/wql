"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const query_1 = __importDefault(require("./modules/query"));
module.exports = function wql(query, options = {}) {
    return (0, query_1.default)(query, options);
};
