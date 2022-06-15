import uuid from 'uuid';

export interface User {
    id?: string | typeof uuid,
    username: string,
    age: number,
    hobbies: string[],
}
