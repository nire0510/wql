"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function evaluate(item, leaf) {
    if (leaf) {
        if (['AND', 'OR'].includes(leaf.operator)) {
            const left = evaluate(item, leaf.left);
            const right = evaluate(item, leaf.right);
            return leaf.operator === 'AND' ? left && right : left || right;
        }
        if (leaf.left.column === 'selector') {
            return true;
        }
        const left = item[leaf.left.type === 'function' ? leaf.left.name : leaf.left.column];
        const right = leaf.right.value;
        switch (leaf.operator) {
            case '=':
                return left === right;
            case '!=':
                return left !== right;
            case '>':
                return left > right;
            case '>=':
                return left >= right;
            case '<':
                return left < right;
            case '<=':
                return left <= right;
            case 'IN':
                return Array.isArray(right) ? right.map((item) => item.value).includes(left) : left === right;
            case 'NOT IN':
                return Array.isArray(right) ? !right.map((item) => item.value).includes(left) : left !== right;
            case 'LIKE':
            case 'NOT LIKE':
                if (typeof right === 'string') {
                    const regex = new RegExp(`${!right.startsWith('%') ? '^' : ''}${right.replace(/%/g, '')}${!right.endsWith('%') ? '$' : ''}`, 'ig');
                    return left && (leaf.operator === 'LIKE' ? left.match(regex) : !left.match(regex));
                }
                return false;
            case 'BETWEEN':
                return left >= right[0] && left <= right[1];
            case 'NOT BETWEEN':
                return left < right[0] || left > right[1];
            default:
                return false;
        }
    }
    return false;
}
function filter(data, where) {
    if (where && where.tree) {
        return data.filter((item) => evaluate(item, where.tree));
    }
    return data;
}
exports.default = filter;
