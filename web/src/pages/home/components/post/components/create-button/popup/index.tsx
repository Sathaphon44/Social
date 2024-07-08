import React, { ReactElement, ReactNode, useContext } from "react";
import ReactDOM from "react-dom";
import "./style.css"
import { SendHorizontal, X } from "lucide-react";
import ApiServices from "../../../../../../../api";
import { postContext } from "../../../../../../../context/postContext";
import { PostModel } from "../../../../../../../models/post";
import { authContext } from "../../../../../../../context/authContext";
const api = new ApiServices();

type PropType = {
    handleClose: () => void;
}

export function PopupComponent({ handleClose }: PropType) {
    const postProvider = useContext(postContext);
    const authProvider = useContext(authContext);


    const handleCreatePost = async (events: React.FormEvent<HTMLFormElement>) => {
        events.preventDefault()

        const form = events.currentTarget;
        const content = (form.elements.namedItem("content") as HTMLInputElement)?.value;
        if (!content) {
            return alert("กรุณากรอกเนื้อหาของโพสต์");
        };
        const data: { content: string } = {
            content: content
        };
        await api.CreatePost(data)
            .then((res: any) => {
                handleClose()
                const newPost: PostModel = res.data;
                // post?.rePost()
                if (authProvider?.user) {
                    postProvider?.setPosts(
                        [
                            {
                                ...newPost,
                                users: {
                                    id: authProvider?.user?.id,
                                    username: authProvider?.user?.username
                                },
                                post_like: [],
                                _count: {
                                    comment: 0,
                                    comment_feedback: 0,
                                    post_like: 0
                                }
                            },
                            ...postProvider?.posts
                        ]
                    )
                }
                // console.log(post?.posts)
                return alert("สร้างโพสต์เรียบร้อย")
            })
            .catch((error: any) => {
                return alert("ไม่สามารถสร้างโพสต์ได้")
            })
    }


    return ReactDOM.createPortal(
        <div className="popup-overlay">
            <div className="popup">
                <header>
                    <h3>สร้างโพสต์</h3>
                    <button className="close-btn" onClick={handleClose}><X /></button>
                </header>
                <main>
                    <form method="post" onSubmit={handleCreatePost}>
                        <textarea name="content" placeholder="คุณคิดอะไรอยู่...." />
                        <button type="submit"><SendHorizontal /></button>
                    </form>
                </main>
            </div>
        </div>,
        document.body
    );
};