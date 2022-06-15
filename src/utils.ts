import { IncomingMessage } from 'http';
import { User } from './interfaces';

export const getRequestData = (data: IncomingMessage): Promise<User> => {
    return new Promise((resolve) => {
        let body: string = '';

        data.on('data', (chunk: Buffer) => {
            body += chunk.toString();
        });

        data.on('end', () => {
            resolve(JSON.parse(body));
        });
    });
}
