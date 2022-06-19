import { checkId, getRequestData, updateUserList } from '../utils/utils';
import users from '../users.json';
import { DEFAULT_HEAD, RESPONSE_MESSAGES, STATUS_CODE } from '../utils/constants';
import { User } from '../utils/interfaces';

export const updateUser = async (req: any, res: any) => {
    try {
        const id = checkId(req);

        if (id) {
            const user: User = (users as User[]).filter(person => person.id === id[0])[0];

            if (user) {
                const body = await getRequestData(req);
                const { username, age, hobbies } = JSON.parse(body as string);

                user.username = username || user.username;
                user.age = age || user.age;
                user.hobbies = hobbies || user.hobbies;

                updateUserList(users);

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
};
