import axios from "axios"
import config from "../config"
import { SignInModel, SignUpModel } from "../models/auth"
import cookies from "js-cookie"
import { CommentModel, CreateComment, CreateCommentFeedback, CreateLike, DeleteComment, DeleteLike, EditComment } from "../models/post"

export default class ApiServices {

    private api = axios.create({
        baseURL: config.api_url
    })

    async SignIn(data: SignInModel) {
        return await this.api.post("/auth/sign-in", data)
    }

    async SignUp(data: SignUpModel) {
        return await this.api.post("/auth/sign-up", data)
    }

    async Session() {
        const token = cookies.get("token");
        if (token) {
            return await this.api.get("/user/session", {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
        }
    }

    async GetPost() {
        const token = cookies.get("token");
        if (token) {
            return await this.api.get("/post/for-user", {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
        }
        return await this.api.get("/post")
    }


    async CreatePost(data: { content: string }) {
        return await this.api.post("/post",
            data,
            {
                headers: {
                    "authorization": `Bearer ${cookies.get("token")}`
                }
            })
    }

    async EditPost(data: { id: number, content: string }) {
        return await this.api.put("/post",
            data,
            {
                headers: {
                    "authorization": `Bearer ${cookies.get("token")}`
                }
            })
    }

    async DeletePost(data: { id: number }) {
        return await this.api.delete("/post",
            {
                headers: {
                    "authorization": `Bearer ${cookies.get("token")}`
                },
                data
            })
    }

    async CreateLike(data: CreateLike) {
        return await this.api.post("/like", data, {
            headers: {
                "authorization": `Bearer ${cookies.get("token")}`
            }
        })
    }

    async DeleteLike(data: DeleteLike) {
        return await this.api.delete("/like", {
            headers: {
                "authorization": `Bearer ${cookies.get("token")}`
            },
            data
        })
    }

    async GetComment(postId: number) {
        return await this.api.get(`/comment/${postId}`);
    }

    async CreateComment(data: CreateComment) {
        return await this.api.post("/comment",
            data, {
            headers: {
                "authorization": `Bearer ${cookies.get("token")}`
            }
        })
    }

    async DeleteComment(data: DeleteComment) {
        return await this.api.delete("/comment",
            {
                headers: {
                    "authorization": `Bearer ${cookies.get("token")}`
                },
                data
            })
    }

    async EditComment(data: EditComment) {
        return await this.api.put("/comment", data,
            {
                headers: {
                    "authorization": `Bearer ${cookies.get("token")}`
                }
            }
        )
    }

    async CreateCommentFeedback(data: CreateCommentFeedback) {
        return await this.api.post("/comment-feedback", data,
            {
                headers: {
                    "authorization": `Bearer ${cookies.get("token")}`
                }
            }
        )
    }
}