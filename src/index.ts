import http from 'http';
import * as dotenv from 'dotenv';
import { createUser } from './crud/create';
import { STATUS_CODE, DEFAULT_HEAD } from './utils/constants';
import {getUsers} from './crud/get';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(async (req, res) => {
    try {
        if (req.url === '/api/users' && req.method === 'GET') {
            await getUsers(req, res);
        }
        if (req.url === '/api/users' && req.method === 'POST') {
            await createUser(req, res);
        }
        res.end();
    } catch {
        res.writeHead(STATUS_CODE.SERVER_ERROR, DEFAULT_HEAD);
        res.end(JSON.stringify({ 'message': '500 Internal Server Error' }));
    }
});

server.listen(PORT, () => {
    process.stdout.write(`Server is running on port: ${PORT}\n`);
});
