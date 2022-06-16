# CRUD-API

### Clone the repo
```bash
git clone https://github.com/taleatg/crud-api.git
cd develop
```

### Install the dependencies
```bash
npm install
```

### Run in development mode
```bash
npm run start:dev
```

### Run in production mode
```bash
npm run start:prod
```

### API endpoints
| Methods | Urls          |  Descriptions |
|---------|---------------|---------------|
|GET      |/api/users     |get all users  |
|GET      |/api/users/${userId}| get one user by userId |
|POST     |/api/users/    | add a new user (you must enter the username, age and hobbies. If you enter more params, only the necessary ones will be taken) |
|PUT      |/api/users/${userId}| update user (you can change username, age, and hobbies. If you enter more params, only the necessary ones will be taken) |
|DELETE   |/api/users/${userId}| delete user by Id |
