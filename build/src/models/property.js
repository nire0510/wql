"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getv_1 = __importDefault(require("getv"));
const argument_1 = __importDefault(require("./argument"));
class Property {
    constructor(astColumn) {
        const column = astColumn.expr || astColumn;
        this.alias = astColumn.as;
        switch (column.type) {
            case 'column_ref':
                this.name = column.column;
                this.type = 'preset';
                break;
            case 'aggr_func':
                this.name = column.name.toLowerCase();
                this.type = 'method';
                this.args = [new argument_1.default(column.args.expr)];
                if (!this.alias) {
                    this.alias = `${this.name}(${this.args.map((arg) => arg.value).join(', ')})`;
                }
                break;
            case 'function':
                this.name = column.name;
                this.type = 'method';
                this.args = (0, getv_1.default)(column, 'args.value', []).map((arg) => new argument_1.default(arg));
                if (!this.alias) {
                    this.alias = `${this.name}(${this.args.map((arg) => arg.value).join(', ')})`;
                }
                break;
            default:
                throw new Error(`Unknown column type: ${column.type}`);
        }
    }
}
exports.default = Property;
