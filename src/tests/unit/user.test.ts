import { User as UserInterface } from "../../models/interface/user"
import { User, UserModel } from "../../models/objection/user"
import { QueryBuilder } from "objection";
import { UserController } from "../../controllers/user";
import { EmailAlreadyRegistered } from "../../exceptions/user";

function setResult(result: Array<UserInterface>) {
    User.query = () => QueryBuilder.forClass(User).resolve(result) as any;
}

const MockModel = new UserModel(User);
MockModel.comparePassword = async (password: string, hash: string) => password == hash;

const MockController = new UserController(MockModel);

test("User sign up", async () => {
    // sign up works on proper data
    setResult([] as any)
    await MockController.signUp({email: "bob", password: "password"})
    

    // sign up fails on duplicate email
    // setResult([{id: 1, email:"bob", password: "password"}])
    
    MockController.signUp({email: "bob", password: "password"})
    .catch(e => {
        expect(e).toBeInstanceOf(EmailAlreadyRegistered);
    })
    
})

// test("User sign in", async () => {
//     // sign in fails on missing user

//     // sign in fails on incorrect password

//     // sign in works on proper credentials
// })