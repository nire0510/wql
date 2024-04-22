"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
function distinct(data, apply) {
    if (apply) {
        return lodash_1.default.uniqWith(data, lodash_1.default.isEqual);
    }
    return data;
}
exports.default = distinct;
