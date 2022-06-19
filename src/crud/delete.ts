import { checkId, updateUserList } from '../utils/utils';
import users from '../users.json';
import { DEFAULT_HEAD, RESPONSE_MESSAGES, STATUS_CODE } from '../utils/constants';
import { User } from '../utils/interfaces';

export const deleteUser = async (req: any, res: any) => {
    try {
        const id = checkId(req);

        if (id) {
            const user: User = (users as User[]).filter(person => person.id === id[0])[0];

            if (user) {
                let index = 0;
                users.filter((person: User, ind) => {
                    if (person.id === id[0]) {
                        index = ind;
                    }
                    return;
                });
                users.splice(index, 1);
                updateUserList(users);

                res.writeHead(STATUS_CODE.NO_CONTENT, DEFAULT_HEAD);
                res.end();
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
