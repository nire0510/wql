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
const browser_1 = __importDefault(require("../../src/modules/browser"));
describe('Browser Service', () => {
    const browser = new browser_1.default({});
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield browser.close();
    }));
    test('should navigate to using goto', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield browser.goto('https://www.example.com');
        expect(response).not.toBeNull();
        expect(response.status()).toBe(200); // 200 is the status code we
    }));
    test('should extract link href attribute using getAttribute', () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield browser.getAttribute('a', 'href'))[0]).toBe('https://www.iana.org/domains/example');
    }));
    test('should extract h1 content using getContent', () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield browser.getContent('h1'))[0]).toBe('Example Domain');
    }));
    // test('should extract h1 data attribute using getData', async () => {
    // });
    test('should extract h1 markaup using getHtml', () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield browser.getHtml('h1'))[0]).toBe('<h1>Example Domain</h1>');
    }));
    test('should extract a link element font color using getHtml', () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield browser.getStyle('a', 'color'))[0]).toBe('rgb(56, 72, 143)');
    }));
    test('should return the webpage title using getTitle', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield browser.getTitle()).toBe('Example Domain');
    }));
});
