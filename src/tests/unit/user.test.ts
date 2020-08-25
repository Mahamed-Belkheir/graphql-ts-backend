import { User as UserInterface } from "../../models/interface/user"
import { User, UserModel } from "../../models/objection/user"
import { QueryBuilder } from "objection";
import { UserController } from "../../controllers/user";
import { EmailAlreadyRegistered, UserNotFound, InvalidCredentials } from "../../exceptions/user";

function setResult(result: Array<UserInterface>) {
    User.query = () => { return QueryBuilder.forClass(User).resolve(result) as any };
}

const MockModel = new UserModel(User);
MockModel.comparePassword = async (password: string, hash: string) => password == hash;

const MockController = new UserController(MockModel);

test("User sign up works on unique email", async () => {
    setResult([])
    await MockController.signUp({username: "bob", email: "bob@gmail.com", password: "password"})
})

test("User sign up fails on duplicate email", async () => {
    setResult([{id: 1, username: "bob", email:"bob", password: "password"}])
    try {
        await MockController.signUp({username: "bob",email: "bob", password: "password"})
    } catch(e) {
        expect(e).toBeInstanceOf(EmailAlreadyRegistered);
    }
})

test("User sign in fails on missing user", async () => {
    setResult([])
    try {
        await MockController.signIn({username: "bob",email: "bob", password:"password"})
    } catch(e) {
        expect(e).toBeInstanceOf(UserNotFound)
    }
})

test("User sign in fails on incorrect password", async () => {
    setResult([{id: 1,username: "bob", email: "bob", password:"password123"}])
    try {
        await MockController.signIn({username: "bob",email: "bob", password:"password"})
    } catch(e) {
        expect(e).toBeInstanceOf(InvalidCredentials)
    }
})

test("User sign in works on correct password", async () => {
    setResult([{id: 1,username: "bob", email: "bob", password:"password"}])
    await MockController.signIn({username: "bob",email: "bob", password:"password"})
})
