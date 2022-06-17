import http from 'http';
import * as dotenv from 'dotenv';
import { createUser } from './crud/create';
import { STATUS_CODE, RESPONSE_MESSAGES, DEFAULT_HEAD } from './utils/constants';
import { getUsers, getUserById } from './crud/get';
import { updateUser } from './crud/update';
import { checkPath } from './utils/utils';
import { deleteUser } from './crud/delete';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(async (req, res) => {
    try {

        if (req.url) {

            if (req.url === '/api/users' && req.method === 'GET') {
                getUsers(req, res);

            } else if (checkPath(req.url as string) && req.method === 'GET') {
                getUserById(req, res);

            } else if (req.url === '/api/users' && req.method === 'POST') {
                await createUser(req, res);

            } else if (checkPath(req.url as string) && req.method === 'PUT') {
                await updateUser(req, res);

            } else if (checkPath(req.url as string) && req.method === 'DELETE') {
                await deleteUser(req, res);

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
