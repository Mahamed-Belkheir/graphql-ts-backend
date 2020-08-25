import Model from "../../db/objection/index";
import { PostModelInterface, Post as PostInterface } from "../interface/post";

export class Post extends Model {
    
    id: number
    user_id: number
    title: string
    content: string
    
    static get tableName() {
        return "posts";
    }

    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                id:         { type: "number" },
                user_id:    { type: "number" },
                title:      { type: "string" },
                content:    { type: "string" },
            }
        }
    }
}


export class PostModel implements PostModelInterface {
    post: typeof Post
    
    constructor(postModel: typeof Post) {
        this.post = postModel;
    }
    
    async create(postData: Omit<PostInterface, "id">) {
        await this.post.query().insert(postData);
    }

    async read(postQuery: Partial<PostInterface>) {
        return this.post.query().where(postQuery);
    }

    async update(id: number, postData: Partial<PostInterface>) {
        await this.post.query().findById(id).patch(postData);
    }
    async delete(id: number) {
        await this.post.query().deleteById(id);
    }
}