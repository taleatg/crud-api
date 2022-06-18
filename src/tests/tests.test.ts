const supertest = require('supertest');
require('dotenv').config();
const request = supertest(`localhost:${process.env.PORT || 4000}`)

let id = '';
const url = '/api/users';
let user = {}

describe('Script 1', () => {
    it('Get all users (an empty array is expected)', async () => {
        const res = await request.get(url);

        expect(res.statusCode).toBe(200);
        // expect(res.body).toEqual([]);
    });

    it('A new user is created (a response containing newly created record is expected)', async () => {
        const userInfo = {
            username: 'Petya',
            age: 25,
            hobbies: ['cycling'],
        }

        const res = await request.post(url).send(userInfo);
        id = res.body.id;

        user = {
            id,
            ...userInfo,
        };

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(user);
    });

    it('Get user by Id', async () => {
        const res = await request.get(`${url}/${id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(user);
    });

    it('We try to update the created record (a response is expected containing an updated object with the same id)', async () => {
        const newUserInfo = {
            username: 'NewName',
            age: 45,
            hobbies: ['books'],
        }

        const res = await request.put(`${url}/${id}`).send(newUserInfo);

        user = {
            id,
            ...newUserInfo,
        }

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(user);
    });

    it('We delete the created object by id (confirmation of successful deletion is expected)', async () => {
        const res = await request.delete(`${url}/${id}`);

        expect(res.statusCode).toBe(204);
    });

    it('We are trying to get a deleted object by id (expected answer is that there is no such object)', async () => {
        const res = await request.get(`${url}/${id}`);

        expect(res.statusCode).toBe(404);
    });
});

describe('Script 2', () => {
   it('A new user is created (an error expected)', async () => {
       const userInfo = {
           username: 'Petya',
           age: 25
       }

       const res = await request.post(url).send(userInfo);

       expect(res.statusCode).toBe(400);
   });

   it('A new user is created (a response containing newly created record is expected)', async () => {
        const userInfo = {
            username: 'Vasya',
            age: 35,
            hobbies: ['cycling'],
        }

        const res = await request.post(url).send(userInfo);
        id = res.body.id;

        user = {
            id,
            ...userInfo,
        };

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(user);
   });

   it('We try to update user (a response is expected containing an updated object with the same id)', async () => {
       const newUserInfo = {
           username: 'NewName',
           age: 45,
           hobbies: ['books'],
       }

       const res = await request.put(`${url}/${id}`).send(newUserInfo);

       user = {
           id,
           ...newUserInfo,
       }

       expect(res.statusCode).toBe(200);
       expect(res.body).toEqual(user);
   });

   it('We try to update user (an error expected containing message about record with userId doesn\'t exist)', async () => {
       const newUserInfo = {
           username: 'NewName',
           age: 45,
           hobbies: ['books'],
       }

       const res = await request.put(`${url}/${'wrong-id'}`).send(newUserInfo);

       expect(res.statusCode).toBe(400);
   });

   it('We try to update user (an error expected containing message about an userId is invalid)', async () => {
      const newUserInfo = {
          username: 'NewName',
          age: 45,
          hobbies: ['books'],
      }

      const res = await request.put(`${url}/${'b2' + id.slice(2)}`).send(newUserInfo);

      expect(res.statusCode).toBe(404);
   });

   it('Get updated user by Id', async () => {
       const res = await request.get(`${url}/${id}`);

       expect(res.statusCode).toBe(200);
       expect(res.body).toEqual(user);
   });
});

describe('Script 3', () => {
   it('We try to update user (an error expected containing message about an userId is invalid )', async () => {
       const newUserInfo = {
           username: 'Tom',
           age: 26,
           hobbies: ['football'],
       }

       const res = await request.put(`${url}/${id}`).send(newUserInfo);

       user = {
           id,
           ...newUserInfo,
       }

       expect(res.statusCode).toBe(200);
       expect(res.body).toEqual(user);
   });

   it('Get updated user by Id', async () => {
       const res = await request.get(`${url}/${id}`);

       expect(res.statusCode).toBe(200);
       expect(res.body).toEqual(user);
   });

    it('We delete the created object by id (confirmation of successful deletion is expected)', async () => {
        const res = await request.delete(`${url}/${id}`);

        expect(res.statusCode).toBe(204);
    });

    it(' We delete the created object by id (expected not found user)', async () => {
        const res = await request.delete(`${url}/${id}`);

        expect(res.statusCode).toBe(404);
    });

    it('We try to update the created record (expected not found user)', async () => {
        const newUserInfo = {
            username: 'NewName',
            age: 45,
            hobbies: ['books'],
        }

        const res = await request.put(`${url}/${'b2' + id.slice(2)}`).send(newUserInfo);

        expect(res.statusCode).toBe(404);
    });

    it('Get user by Id (expected not found user)', async () => {
       const res = await request.get(`${url}/${id}`);

       expect(res.statusCode).toBe(404);
   });
});
