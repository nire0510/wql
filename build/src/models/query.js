"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Query {
    constructor(statement, website, properties, where, order, distinct, limit) {
        this.statement = statement;
        this.website = website;
        this.properties = properties;
        this.where = where;
        this.order = order;
        this.distinct = distinct || false;
        this.limit = limit;
    }
}
exports.default = Query;
