"use strict";
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
const browser_1 = __importDefault(require("../browser"));
function load(url, options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const browser = new browser_1.default(options);
            const waitPreset = ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'].some((preset) => preset === options.wait);
            yield browser.goto(url, {
                waitUntil: waitPreset && options.wait || 'networkidle2',
            });
            !waitPreset && options.wait && (yield browser.waitForSelector(options.wait, {
                visible: true,
            }));
            return browser;
        }
        catch (error) {
            throw new Error(`Unable to open browser and navigate to ${url}: ${error}`);
        }
    });
}
exports.default = load;
