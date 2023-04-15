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
const getv_1 = __importDefault(require("getv"));
const puppeteer_1 = __importDefault(require("puppeteer"));
class Browser {
    constructor(options) {
        this.initialized = false;
        this.browser = null;
        this.options = options;
        this.page = null;
    }
    _init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.initialized) {
                const args = [
                    // '--autoplay-policy=user-gesture-required',
                    // '--disable-background-networking',
                    // '--disable-background-timer-throttling',
                    // '--disable-backgrounding-occluded-windows',
                    // '--disable-breakpad',
                    // '--disable-client-side-phishing-detection',
                    // '--disable-component-update',
                    // '--disable-default-apps',
                    // '--disable-dev-shm-usage',
                    // '--disable-domain-reliability',
                    // '--disable-extensions',
                    // '--disable-features=AudioServiceOutOfProcess',
                    // '--disable-hang-monitor',
                    // '--disable-ipc-flooding-protection',
                    // '--disable-notifications',
                    // '--disable-offer-store-unmasked-wallet-cards',
                    // '--disable-popup-blocking',
                    // '--disable-print-preview',
                    // '--disable-prompt-on-repost',
                    // '--disable-renderer-backgrounding',
                    // '--disable-setuid-sandbox',
                    // '--disable-speech-api',
                    // '--disable-sync',
                    '--enable-automation',
                    // '--hide-scrollbars',
                    // '--ignore-gpu-blacklist',
                    // '--metrics-recording-only',
                    // '--mute-audio',
                    // '--no-default-browser-check',
                    // '--no-first-run',
                    // '--no-pings',
                    // '--no-sandbox',
                    // '--no-zygote',
                    // '--password-store=basic',
                    // '--use-gl=swiftshader',
                    // '--use-mock-keychain',
                    '--profile-directory=Default',
                ];
                this.browser = yield puppeteer_1.default.launch({
                    // args,
                    defaultViewport: (0, getv_1.default)(this.options, 'viewport', {
                        height: 720,
                        width: 1080,
                    }),
                    headless: (0, getv_1.default)(this.options, 'headless', true),
                    userDataDir: (0, getv_1.default)(this.options, 'userDataDir', undefined),
                    executablePath: (0, getv_1.default)(this.options, 'executablePath', undefined),
                });
                this.page = yield this.browser.newPage();
                if ((0, getv_1.default)(this.options, 'turbo', false)) {
                    yield this.page.setRequestInterception(true);
                    this.page.on('request', (request) => {
                        if (['font', 'image', 'stylesheet'].includes(request.resourceType())) {
                            request.abort();
                        }
                        else {
                            request.continue();
                        }
                    });
                }
                this.initialized = true;
            }
            return Promise.resolve();
        });
    }
    $$eval(selector, mapper) {
        return this.page.$$eval(selector, (elementHandles, mapper) => elementHandles.map((element) => mapper(element)), mapper);
    }
    close() {
        return this.browser.close();
    }
    evaluate(elementHandles, fnc) {
        return this.page.evaluate(fnc, elementHandles);
    }
    getAttribute(selector, attribute) {
        return this.page.$$eval(selector, (elements, attribute) => elements.map((element) => element.getAttribute(attribute)), attribute);
    }
    getContent(selector) {
        if (selector === null) {
            return this.page.content();
        }
        return this.page.$$eval(selector, (elements) => elements.map((element) => element.textContent));
    }
    getCookies() {
        return this.page.cookies();
    }
    getData(selector, attribute) {
        return this.page.$$eval(selector, (elements, attribute) => elements.map((element) => element.dataset[attribute]), attribute);
    }
    getHtml(selector) {
        return this.page.$$eval(selector, (elements) => elements.map((element) => element.outerHTML));
    }
    getStyle(selector, property) {
        return this.page.$$eval(selector, (elements, property) => elements.map((element) => window.getComputedStyle(element).getPropertyValue(property)), property);
    }
    getTitle() {
        return this.page.title();
    }
    getUserAgent() {
        return this.browser.userAgent();
    }
    goto(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._init();
            return this.page.goto(url, options);
        });
    }
    executeScript(fnc, ...args) {
        return this.page.evaluate(fnc, ...args);
    }
    pdf(filepath) {
        return this.page.pdf({
            path: filepath,
        });
    }
    screenshot(filepath) {
        return this.page.screenshot({
            fullPage: true,
            path: filepath,
        });
    }
    waitForSelector(selector, options) {
        return this.page.waitForSelector(selector, options);
    }
    waitForNavigation() {
        return this.page.waitForNavigation();
    }
    waitForNetworkIdle() {
        return this.page.waitForNetworkIdle();
    }
}
exports.default = Browser;
