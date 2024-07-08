import React, { FormEvent, ReactElement, ReactEventHandler, useContext, useEffect, useState } from 'react'
import "./style.css";
import ApiServices from '../../../../../../api';
import { CommentModel, CreateComment, PostModel } from '../../../../../../models/post';
import { authContext } from '../../../../../../context/authContext';
import { postContext } from '../../../../../../context/postContext';
import { CircleUserRound, SendHorizonal } from 'lucide-react';
const api = new ApiServices();

type PropsType = {
    post: PostModel | undefined;
    comments: CommentModel[];
}

function AddComment(props: PropsType) {
    const auth = useContext(authContext);
    const post = useContext(postContext);


    const handleSubmit = async (events: FormEvent<HTMLFormElement>) => {
        events.preventDefault();
        const form = events.currentTarget;
        const content = (form.elements.namedItem("content") as HTMLInputElement)?.value;
        if (!content) {
            return alert("กรุณากรอกเนื้อหาที่จะคอมเม้น")
        }

        const userId = auth?.user?.id;
        const postId = props?.post?.id;

        if (!userId || !postId) {
            return alert("เกิดข้อผิดพลาดไม่สามารถแสดงความคิดเห็นได้");
        };

        const data: CreateComment = {
            postId: postId,
            content: content
        };
        await api.CreateComment(data)
            .then((res: any) => {
                const commentId = res.data?.id;
                const postId = res.data?.postId;
                if (commentId && props.comments) {
                    const comment = props.comments.find((comment: CommentModel) => comment.id === commentId);
                    if (!comment) {
                        const newPosts = post?.posts.map((p: PostModel) => (
                            p.id === postId ? {
                                ...p,
                                _count: {
                                    ...p._count,
                                    comment: p._count.comment + 1
                                }
                            } : p
                        ));
                        newPosts && post?.setPosts(newPosts);
                        post?.setComments([...post?.comments, res.data]);
                        form.reset()
                        setTimeout(() => {
                            const container = document.getElementById('post-modal-main');
                            if (container) {
                                container.scrollTop = container.scrollHeight;
                            }
                        }, 200)
                    }
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }


    return (
        <div className='add-comment-container'>
            <span><CircleUserRound /></span>
            <form onSubmit={handleSubmit} className='add-comment-form'>
                <textarea name="content" placeholder='แสดงความคิดเห็นของคุณ....' maxLength={300} />
                <button type="submit"><SendHorizonal /></button>
            </form>
        </div>
    )
}

export default AddComment