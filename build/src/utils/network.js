"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whois = exports.isUrlExists = exports.getIpAddress = void 0;
const dns_1 = __importDefault(require("dns"));
const https_1 = __importDefault(require("https"));
const net_1 = __importDefault(require("net"));
function getIpAddress(hostname) {
    return new Promise((resolve, reject) => {
        dns_1.default.lookup(hostname, (err, address) => {
            if (err) {
                return reject(err);
            }
            resolve(address);
        });
    });
}
exports.getIpAddress = getIpAddress;
function isUrlExists(url) {
    return new Promise((resolve, reject) => {
        https_1.default
            .request(url, { method: 'HEAD' }, (res) => {
            if (res && res.statusCode && res.statusCode >= 200 && res.statusCode < 400) {
                return resolve(true);
            }
            return resolve(false);
        })
            .on('error', (err) => {
            resolve(false);
        })
            .end();
    });
}
exports.isUrlExists = isUrlExists;
function whois(domain, host = 'whois.denic.de') {
    const socket = new net_1.default.Socket();
    const msg = domain + '\r\n';
    return new Promise((resolve, reject) => {
        socket.connect(43, host, () => {
            socket.write(msg);
        });
        socket.on('data', (data) => {
            resolve(data.toString());
            socket.destroy();
        });
        socket.on('error', (err) => {
            reject(err);
        });
    });
}
exports.whois = whois;
