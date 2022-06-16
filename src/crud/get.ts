import {DEFAULT_HEAD, STATUS_CODE} from '../utils/constants';
import users from '../users.json';

export const getUsers = async (_: any, res: any) => {
    try {
        res.writeHead(STATUS_CODE.OK, DEFAULT_HEAD);
        res.end(JSON.stringify(users));
    } catch (err: any) {
        process.stdout.write(err);
        res.end(JSON.stringify([]));
    }
}
