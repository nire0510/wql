"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_uniqwith_1 = __importDefault(require("lodash.uniqwith"));
const lodash_isequal_1 = __importDefault(require("lodash.isequal"));
function distinct(data, apply) {
    if (apply) {
        return (0, lodash_uniqwith_1.default)(data, lodash_isequal_1.default);
    }
    return data;
}
exports.default = distinct;
