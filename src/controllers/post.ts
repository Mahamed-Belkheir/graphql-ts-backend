import { PostModelInterface, Post } from "src/models/interface/post";
import { UserDoesNotOwnResource } from "src/exceptions/user";

export class PostController {
    posts: PostModelInterface

    constructor(posts: PostModelInterface) {
        this.posts = posts;
    }

    async getAllPosts() {
        return this.posts.read({});
    }

    async getUserPosts(user_id:  number) {
        return this.posts.read({ user_id });
    }

    async getOnePost(id: number) {
        return this.posts.read({ id });
    }

    async addPost(postData: Omit<Post, "id">) {
        await this.posts.create(postData);
    }

    async editPost(id: number, user_id: number, postData: Partial<Post>) {
        let [ post ] = await this.posts.read({id});
        if (post.user_id !== user_id) throw new UserDoesNotOwnResource()
        await this.posts.update(id, postData);
    }

    async deletePost(id: number, user_id: number) {
        let [ post ] = await this.posts.read({id});
        if (post.user_id !== user_id) throw new UserDoesNotOwnResource()
        await this.posts.delete(id);
    }
}