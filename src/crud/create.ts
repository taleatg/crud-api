import { v4 } from 'uuid';
import fs  from 'fs';
import { getRequestData } from '../utils';
import * as users from '../users.json';
import { User } from '../interfaces';

const addUser = (user: User) => {
    return new Promise((resolve, reject) => {
    const newUser = {id: v4(), ...user};
    let allUsers: User[] = [];
    allUsers.push(newUser);

    if (process.env.NODE_ENV !== 'test') {
        fs.writeFile('../users.json', JSON.stringify(allUsers), () => {});
    }

    resolve(newUser);
    });
}

export const createUser = async (req: any, res: any) => {
    try {
        const body = await getRequestData(req);
        const { username, age, hobbies } = body;
        const user = {
            username,
            age,
            hobbies,
        };
        const newUser = await addUser(user);

        res.writeHead(201, { 'Content-type': 'application/json' });
        return res.end(JSON.stringify(newUser));
    } catch (err) {
        console.log(err);
    }
}
