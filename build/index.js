"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const main_1 = __importDefault(require("./src/modules/main"));
module.exports = function wql(query, options = {}) {
    return (0, main_1.default)(query, options);
};
