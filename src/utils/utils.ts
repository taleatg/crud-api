import { IncomingMessage } from 'http';
import { User } from './interfaces';
import fs  from 'fs';
import path, { dirname } from 'path';

export const getRequestData = (data: IncomingMessage) => new Promise((resolve): void => {
    try {
        let body: string = '';

        data.on('data', (chunk: Buffer) => {
            body += chunk.toString();
        });

        data.on('end', () => resolve(body));
    } catch (err: any) {
        process.stdout.write(err);
    }
});

export const updateUserList = (users: User[]) => {
    const __dirname = dirname(__filename);
    const file = path.join(__dirname, '../users.json');

    fs.writeFile(file, JSON.stringify(users), () => {
        process.stdout.write('User has been added\n');
    });
};

export const checkPath = (path: string) => {
    const params = path.split('/');
    return params.length === 4 && params[1] === 'api' && params[2] === 'users';
};

export const checkId = (req: any) => req.url.match(/[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i);
