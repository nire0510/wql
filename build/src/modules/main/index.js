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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const merger_1 = __importDefault(require("./merger"));
const extractor_1 = __importDefault(require("./extractor"));
const fsUtils = __importStar(require("../../utils/fs"));
const limiter_1 = __importDefault(require("./limiter"));
const loader_1 = __importDefault(require("./loader"));
const netUtils = __importStar(require("../../utils/network"));
const sorter_1 = __importDefault(require("./sorter"));
const parser_1 = __importDefault(require("./parser"));
const response_1 = __importDefault(require("../../models/response"));
const filter_1 = __importDefault(require("./filter"));
function run(query, options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queries = (0, parser_1.default)(query);
            const responses = yield Promise.all(queries.map((query) => __awaiter(this, void 0, void 0, function* () {
                const start = Date.now();
                const browser = yield (0, loader_1.default)(query.website.url, options);
                const ipAddress = yield netUtils.getIpAddress(new URL(query.website.url).hostname);
                const pageDescription = ((yield browser.getAttribute('head > meta[name="description"]', 'content')) || [''])[0];
                const pageModified = yield browser.executeScript(() => document.lastModified);
                const pageTitle = yield browser.getTitle();
                const userAgent = yield browser.getUserAgent();
                const data = yield (0, extractor_1.default)(browser, query);
                const dataFiltered = (0, filter_1.default)(data, query.where);
                const dataOrdered = (0, sorter_1.default)(dataFiltered, query.order);
                const dataDistinct = (0, merger_1.default)(dataOrdered, query.distinct);
                const dataLimited = (0, limiter_1.default)(dataDistinct, query.limit);
                const properties = query.properties.map((property) => property.alias || property.name);
                const dataFinal = dataLimited.map((row) => lodash_1.default.pick(row, ...properties));
                const response = new response_1.default(Object.assign({ userAgent }, options), {
                    url: query.website.url,
                    ip: ipAddress,
                    name: query.website.alias,
                    title: pageTitle,
                    description: pageDescription,
                    modified: pageModified,
                }, {
                    datetime: new Date(),
                    statement: query.statement,
                    screenshot: options.screenshot ? fsUtils.generateTempFilePath('png') : undefined,
                    duration: Math.round((Date.now() - start) / 1000),
                }, dataFinal);
                options.screenshot && (yield browser.screenshot(response.meta.query.screenshot));
                yield browser.close();
                return response;
            })));
            return responses;
        }
        catch (error) {
            throw new Error(`Unable to run query: ${error}`);
        }
    });
}
exports.default = run;
