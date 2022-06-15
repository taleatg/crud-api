import http from 'http';
import { createUser } from './crud/create';

const PORT = process.env.PORT || 4000;
const server = http.createServer(async (req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        return res.end('get USERS');
    } if (req.url === '/api/users' && req.method === 'POST') {
        await createUser(req, res);
    }
    res.end();
});

server.listen(PORT, () => {
    process.stdout.write(`Listening on port ${PORT}`);
});
