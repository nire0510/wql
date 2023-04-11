"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getv_1 = __importDefault(require("getv"));
const node_sql_parser_1 = __importDefault(require("node-sql-parser"));
const order_1 = __importDefault(require("../../models/order"));
const property_1 = __importDefault(require("../../models/property"));
const query_1 = __importDefault(require("../../models/query"));
const validator = __importStar(require("./validator"));
const website_1 = __importDefault(require("../../models/website"));
const where_1 = __importDefault(require("../../models/where"));
const parser = new node_sql_parser_1.default.Parser();
function astObjectToQuery(astObject) {
    try {
        const queries = [];
        astObject.from.forEach((astObjectFrom) => {
            const { from } = astObject, astObjectExceptfrom = __rest(astObject, ["from"]);
            astObjectExceptfrom.from = [astObjectFrom];
            const website = new website_1.default(astObjectFrom.table, astObjectFrom.as);
            const properties = (0, getv_1.default)(astObject, 'columns', [{ expr: { type: 'string', value: '*' } }]).map((column) => new property_1.default(column));
            const where = new where_1.default(astObject.where);
            const order = ((0, getv_1.default)(astObject, 'orderby', []) || []).map((order) => new order_1.default(order));
            if (validator.postValidate(properties, where)) {
                const query = new query_1.default(parser.sqlify(astObjectExceptfrom), website, properties, where, order, astObject.distinct, (0, getv_1.default)(astObject, 'limit.value.0.value'));
                queries.push(query);
            }
        });
        if (astObject.union && astObject._next) {
            return queries.concat(astObjectToQuery(astObject._next));
        }
        return queries;
    }
    catch (error) {
        throw new Error(`Failed to transform ast object to query: ${error}`);
    }
}
function parse(query) {
    try {
        const ast = parser.astify(query);
        const queries = [];
        const validation = validator.preValidate(ast, query);
        if (!validation.valid) {
            throw new Error(`Invalid query: ${validation.message}`);
        }
        (!Array.isArray(ast) ? [ast] : ast).forEach((astObject) => {
            queries.push(...astObjectToQuery(astObject));
        });
        return queries;
    }
    catch (error) {
        throw new Error(`Failed to parse query: ${error}`);
    }
}
exports.default = parse;
