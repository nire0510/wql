"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function limit(data, limit) {
    if (limit > 0 && data.length > limit) {
        return data.slice(0, limit);
    }
    return data;
}
exports.default = limit;
