"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTempFilePath = void 0;
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
function generateTempFilePath(ext) {
    const filepath = path_1.default.join(os_1.default.tmpdir(), `${Date.now().toString()}.${ext}`);
    return filepath;
}
exports.generateTempFilePath = generateTempFilePath;
