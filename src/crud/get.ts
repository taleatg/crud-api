import { DEFAULT_HEAD, STATUS_CODE, RESPONSE_MESSAGES } from '../utils/constants';
import users from '../users.json';
import { checkId } from '../utils/utils';

export const getUsers = (_: any, res: any) => {
    try {
        res.writeHead(STATUS_CODE.OK, DEFAULT_HEAD);
        res.end(JSON.stringify(users));
    } catch (err: any) {
        process.stdout.write(err);
        res.end(JSON.stringify([]));
    }
}

export const getUserById = (req: any, res: any) => {
    try {
        const id = checkId(req);

        if (id) {
            const user = users.filter(person => person.id === id[0]);

            if (user.length) {
                res.writeHead(STATUS_CODE.OK, DEFAULT_HEAD);
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(STATUS_CODE.NOT_FOUND, DEFAULT_HEAD);
                res.end(JSON.stringify({ 'message': RESPONSE_MESSAGES.NOT_FOUND }));
            }
        } else {
            res.writeHead(STATUS_CODE.BAD_REQUEST, DEFAULT_HEAD);
            res.end(JSON.stringify({ 'message': RESPONSE_MESSAGES.INVALID_USER_ID }));
        }

    } catch (err: any) {
        process.stdout.write(err);
    }
}
