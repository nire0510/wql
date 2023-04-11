"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("./src/modules/main"));
function wql(query, options) {
    return (0, main_1.default)(query, options);
}
exports.default = wql;
