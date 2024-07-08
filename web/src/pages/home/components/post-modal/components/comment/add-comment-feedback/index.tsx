import React, { FormEvent, ReactHTMLElement, useContext, useState } from 'react'
import { CommentFeedbackModel, CommentModel, CreateCommentFeedback, PostModel } from '../../../../../../../models/post'
import { authContext } from '../../../../../../../context/authContext';
import { CircleUserRound, SendHorizontal, Trash2, X } from 'lucide-react';
import "./style.css"
import ApiServices from '../../../../../../../api';
import { postContext } from '../../../../../../../context/postContext';
const api = new ApiServices();


type PropsType = {
    comment: CommentModel;
}

function AddCommentFeedback(props: PropsType) {

    const authProvider = useContext(authContext);
    const postProvider = useContext(postContext);

    const [content, setContent] = useState<string>("")

    const handleAddCommentFeedback = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let userId: string | undefined = authProvider?.user?.id;
        let commentId: number = props.comment.id;
        let postId: number = props.comment.postId;
        if (userId) {
            const data: CreateCommentFeedback = {
                postId: postId,
                userId: userId,
                commentId: commentId,
                content: content
            };
            await api.CreateCommentFeedback(data)
                .then((res: any) => {
                    const newComment = postProvider?.comments.map((comment: CommentModel) =>
                        comment.id === commentId
                            ? {
                                ...comment,
                                comment_feedback: [
                                    ...comment.comment_feedback,
                                    res.data
                                ]
                            }
                            : comment
                    );
                    const newPosts = postProvider?.posts.map((post: PostModel) =>
                        post.id === postId
                            ? {
                                ...post,
                                _count: {
                                    ...post._count,
                                    comment_feedback: post._count.comment_feedback + 1
                                }
                            }
                            : post
                    );
                    if (newPosts && newComment) {
                        postProvider?.setComments(newComment);
                        postProvider?.setPosts(newPosts);
                    }
                    setTimeout(() => {
                        const element = document.getElementById(`commentFeedback-${res.data.id}`);
                        if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                        }
                    }, 200)
                    setContent("");
                    return alert("Comment Feedback is success created.")
                })
                .catch((error: any) => {

                })
        }
    }

    return (
        <div className='add-comment-feedback' id='add-commentFeedback'>
            <span><CircleUserRound /></span>
            <form onSubmit={handleAddCommentFeedback}>
                <textarea name="content" id="" placeholder='แสดงความคิดเห็น....'
                    value={content}
                    onChange={(e: any) => setContent(e.target.value)}
                />
                <div>
                    <button type="submit"><SendHorizontal /></button>
                    <button><Trash2 /></button>
                </div>
            </form>
        </div>
    )
}

export default AddCommentFeedback