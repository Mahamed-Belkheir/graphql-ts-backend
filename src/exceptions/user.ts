export class InvalidCredentials extends Error {
    statusCode = 400;
    constructor() {
        super("Invalid User Credentials");
    }
}

export class EmailAlreadyRegistered extends Error {
    statusCode = 400;
    constructor() {
        super("Email is already in use");
    }
}

export class UserNotFound extends Error {
    statusCode = 404;
    constructor() {
        super("User was not found");
    }
}
