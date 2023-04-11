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
Object.defineProperty(exports, "__esModule", { value: true });
const netUtils = __importStar(require("../../src/utils/network"));
describe('Network Utility', () => {
    test('getIpAddress - should return the right IP address of a hostname', async () => {
        const ip = await netUtils.getIpAddress('www.example.com');
        expect(ip).toBe('93.184.216.34');
    });
    test('isUrlExists - should return true if URL does exists', async () => {
        const exampleExists = await netUtils.isUrlExists('https://www.example.com');
        const dummyExists = await netUtils.isUrlExists('https://www.1q2w3eewq123.com');
        expect(exampleExists).toBeTruthy();
        expect(dummyExists).toBeFalsy();
    });
});
