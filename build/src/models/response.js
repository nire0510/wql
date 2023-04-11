"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meta_js_1 = __importDefault(require("./meta.js"));
class Response {
    constructor(browserInfo, pageInfo, queryInfo, data) {
        this.meta = new meta_js_1.default(browserInfo, pageInfo, queryInfo);
        this.data = data;
    }
}
exports.default = Response;
