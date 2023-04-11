"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const property_1 = __importDefault(require("./property"));
class Order extends property_1.default {
    constructor(astOrder) {
        super(astOrder);
        this.direction = astOrder.type;
    }
}
exports.default = Order;
