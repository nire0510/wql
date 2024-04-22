"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = __importDefault(require("../browser"));
async function load(url, options) {
    try {
        const browser = new browser_1.default(options);
        const waitPreset = ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'].some((preset) => preset === options.wait);
        await browser.goto(url, {
            waitUntil: waitPreset ? options.wait : 'networkidle2',
        });
        if (!waitPreset && options.wait) {
            await browser.waitForSelector(options.wait, {
                visible: true,
            });
        }
        return browser;
    }
    catch (error) {
        throw new Error(`Unable to open browser and navigate to ${url}: ${error}`);
    }
}
exports.default = load;
