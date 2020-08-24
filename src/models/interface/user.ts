export interface UserModelInterface {
    create(user: Omit<User, "id">): void
    read(user: Partial<User>):  Array<User>
    update(id: number, user: Partial<User>): void
    delete(id: number): void
    comparePassword(password: string, hash: string): boolean
}

export interface User {
    id: number
    email: string
    password: string
}