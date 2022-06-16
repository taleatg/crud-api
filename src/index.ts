import http from 'http';
import * as dotenv from 'dotenv';
import { createUser } from './crud/create';
import { STATUS_CODE, RESPONSE_MESSAGES, DEFAULT_HEAD } from './utils/constants';
import { getUsers, getUserById } from './crud/get';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(async (req, res) => {
    try {
        if (req.url) {

            if (req.url === '/api/users' && req.method === 'GET') {
                await getUsers(req, res);

            } else if (req.url.split('/').length === 4 && req.method === 'GET') {
                await getUserById(req, res);

            } else if (req.url === '/api/users' && req.method === 'POST') {
                await createUser(req, res);

            } else {
                res.writeHead(STATUS_CODE.NOT_FOUND, DEFAULT_HEAD);
                res.end(JSON.stringify({ 'message': RESPONSE_MESSAGES.NON_EXISTENT_ENDPOINT }));
            }
        }
    } catch {
        res.writeHead(STATUS_CODE.SERVER_ERROR, DEFAULT_HEAD);
        res.end(JSON.stringify({ 'message': RESPONSE_MESSAGES.SERVER_ERROR }));
    }
});

server.listen(PORT, () => {
    process.stdout.write(`Server is running on port: ${PORT}\n`);
});
