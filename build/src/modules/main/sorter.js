"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const getv_1 = __importDefault(require("getv"));
function order(data, order) {
    if (Array.isArray(order) && order.length > 0) {
        return lodash_1.default.orderBy(data, order.map((order) => order.alias || order.name), order.map((order) => (0, getv_1.default)(order, 'direction', 'asc').toLowerCase()));
    }
    return data;
}
exports.default = order;
