export interface PostModelInterface {
    create(post: Omit<Post, "id">): Promise<void>
    read(post: Partial<Post>):  Promise<Array<Post>>
    update(id: number, post: Partial<Post>): Promise<void>
    delete(id: number): Promise<void>
}

export interface Post {
    id: number
    user_id: number
    title: string
    content: string
}