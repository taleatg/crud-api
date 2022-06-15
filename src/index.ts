import http from 'http';

const PORT = process.env.PORT || 4000;
const server = http.createServer((req, res) => {
    res.end('Hello');
});

server.listen(PORT, () => {
    process.stdout.write(`Listening on port ${PORT}`);
});
