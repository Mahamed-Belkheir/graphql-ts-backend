export interface UserModelInterface {
    create(user: Omit<User, "id">): Promise<void>
    read(user: Partial<User>):  Promise<Array<User>>
    update(id: number, user: Partial<User>): Promise<void>
    delete(id: number): Promise<void>
    comparePassword(password: string, hash: string): Promise<boolean>
}

export interface User {
    id: number
    email: string
    password: string
}