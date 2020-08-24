import { UserModelInterface, User } from "../models/interface/user";
import { EmailAlreadyRegistered, InvalidCredentials, UserNotFound } from "../exceptions/user";

export class UserController {
    user: UserModelInterface
    constructor(user: UserModelInterface) {
        this.user = user;
    }
    async signUp(userData: Omit<User, "id">) {
        let [check] = await this.user.read({email: userData.email})
        if (check) throw new EmailAlreadyRegistered();
        await this.user.create(userData);
    }
    async signIn(userData: Omit<User, "id">) {
        let [user] = await this.user.read({email: userData.email})
        if (!user) throw new UserNotFound();
        let check = await this.user.comparePassword(userData.password, user.password);
        if (!check) throw new InvalidCredentials();
    }
}