import { IncomingMessage } from 'http';

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
