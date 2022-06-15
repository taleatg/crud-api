"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const PORT = process.env.PORT || 4000;
const server = http_1.default.createServer((req, res) => {
    res.end('Hello');
});
server.listen(PORT, () => {
    process.stdout.write(`Listening on port ${PORT}`);
});
