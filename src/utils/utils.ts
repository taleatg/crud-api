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

export const checkId = (req: any) => req.url.match(/[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i)
