"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const property_1 = __importDefault(require("./property"));
class Where {
    constructor(astWhere) {
        this.tree = astWhere;
        this.properties = this.extract(this.tree, 'properties');
        this.selectors = this.extract(this.tree, 'selectors');
    }
    extract(leaf, type) {
        if (leaf) {
            if (['AND', 'OR'].includes(leaf.operator)) {
                return this.extract(leaf.left, type).concat(this.extract(leaf.right, type));
            }
            else {
                if (type === 'selectors' && leaf.left.column === 'selector') {
                    return Array.isArray(leaf.right.value)
                        ? leaf.right.value.map((value) => value.value)
                        : [leaf.right.value || leaf.right.column];
                }
                else if (type === 'properties' && leaf.left.column !== 'selector') {
                    return [new property_1.default(leaf.left)];
                }
            }
        }
        return [];
    }
}
exports.default = Where;
