import Model from "../../db/objection/index";

export class User extends Model {
    email: string
    password: string
    id: number

    static get tableName() {
        return "users";
    }

    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                id: { type: "integer" },
                email: { type: "string" },
                password: { type: "string" }
            }
        }
    }
}
