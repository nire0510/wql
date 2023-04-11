"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getv_1 = __importDefault(require("getv"));
class Argument {
    constructor(astArgsValue) {
        switch (astArgsValue.type) {
            case 'column_ref':
                this.value = astArgsValue.column;
                break;
            case 'function':
                this.value = 'method';
                this.args = (0, getv_1.default)(astArgsValue, 'args.value', []).map((arg) => new Argument(arg));
                break;
            case 'string':
                this.value = astArgsValue.value;
                break;
            default:
                throw new Error(`Unknown argument type: ${astArgsValue.type}`);
        }
    }
}
exports.default = Argument;
