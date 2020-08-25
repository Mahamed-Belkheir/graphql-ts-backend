import Model from "../../db/objection/index";
import { UserModelInterface, User as UserInterface } from "../interface/user";
import argon2 from "argon2";

export class User extends Model implements UserInterface {
    email: string
    password: string
    id: number
    username: string

    static get tableName() {
        return "users";
    }

    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                id: { type: "integer" },
                email: { type: "string" },
                password: { type: "string" },
                username: { type: "string" }
            }
        }
    }
}


export class UserModel implements UserModelInterface {
    user: typeof User
    constructor(userModel: typeof User) {
        this.user = userModel;
    }

    async create(userData: Omit<UserInterface, "id">) {
        userData.password = await argon2.hash(userData.password);
        await this.user.query().insert(userData);
    }

    async read(partialUser: Partial<UserInterface>) {
        return this.user.query().where(partialUser);
    }

    async update(id: number, partialUser: Partial<UserInterface>) {
        await this.user.query().findById(id).patch(partialUser);
    }

    async delete(id: number) {
       await this.user.query().deleteById(id);
    }
    
    comparePassword(password: string, hash: string) {
        return argon2.verify(hash, password);
    }
}