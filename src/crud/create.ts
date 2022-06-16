import { v4 } from 'uuid';
import fs  from 'fs';
import path, { dirname } from 'path';
import { getRequestData } from '../utils/utils';
import users from '../users.json';
import { User } from '../utils/interfaces';
import {STATUS_CODE, RESPONSE_MESSAGES, DEFAULT_HEAD} from '../utils/constants';

const addUser = (user: User) => new Promise((resolve) => {
    const __dirname = dirname(__filename);
    const file = path.join(__dirname, '../users.json');
    const newUser = {id: v4(), ...user};
    const allUsers: User[] = users;
    allUsers.push(newUser);

    fs.writeFile(file, JSON.stringify(allUsers), () => {
        process.stdout.write('User has been added\n');
    });

    resolve(newUser);
});

export const createUser = async (req: any, res: any) => {
    try {
        const body = await getRequestData(req);
        const {username, age, hobbies} = JSON.parse(body as string);
        const user = {
            username,
            age,
            hobbies,
        };

        if (!username || !age || !hobbies) {
            res.writeHead(STATUS_CODE.BAD_REQUEST, DEFAULT_HEAD);
            res.end(JSON.stringify({ 'message': RESPONSE_MESSAGES.NOT_ENOUGH_DATA }));
            return;
        }

        const newUser = await addUser(user);
        res.writeHead(STATUS_CODE.CREATED, DEFAULT_HEAD);
        res.end(JSON.stringify(newUser));
    } catch {
        res.writeHead(STATUS_CODE.NOT_FOUND, DEFAULT_HEAD);
        res.end(JSON.stringify({ 'message': RESPONSE_MESSAGES.INVALID_DATA }));
    }
}
