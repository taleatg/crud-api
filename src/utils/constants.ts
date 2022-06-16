export const STATUS_CODE = {
    'OK': 200,
    'CREATED': 201,
    'BAD_REQUEST': 400,
    'NOT_FOUND': 404,
    'SERVER_ERROR': 500,
}

export const RESPONSE_MESSAGES = {
    'NON_EXISTENT_ENDPOINT': 'You entered a non-existent endpoint',
    'NOT_FOUND': 'User not found',
    'INVALID_USER_ID': 'You are using the incorrect userID',
    'NOT_ENOUGH_DATA': 'You must enter username, age and hobbies',
    'INVALID_DATA': 'You entered incorrect data',
    'SERVER_ERROR': '500 Internal Server Error',
}

export const DEFAULT_HEAD = {
    'Content-type': 'application/json'
};
