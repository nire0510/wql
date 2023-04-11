"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseMeta {
    constructor(browserInfo, pageInfo, queryInfo) {
        this.browser = browserInfo;
        this.page = pageInfo;
        this.query = Object.assign({}, queryInfo);
    }
}
exports.default = ResponseMeta;
