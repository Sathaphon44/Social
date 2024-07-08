import React, { useContext, useRef, useState } from 'react'
import { CommentModel, EditComment } from '../../../../../../../models/post'
import ApiServices from '../../../../../../../api'
import { postContext } from '../../../../../../../context/postContext';
const api = new ApiServices();

type PropsType = {
    comment: CommentModel;
    close: () => void;
}


function EditCommentComponent(props: PropsType) {
    const postProvider = useContext(postContext);
    const [content, setContent] = useState(props.comment.content);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (content && content === props.comment.content) {
            return alert("คุณยังไม่ได้เปลี่ยนเนื้อหา");
        }
        const commentId = props.comment.id;
        const data: EditComment = {
            id: commentId,
            content: content
        }
        await api.EditComment(data)
            .then((res: any) => {
                let comment: CommentModel = res.data;
                const newContent: CommentModel[] | undefined = postProvider?.comments.map((oldComment: CommentModel) => {
                    if (comment.id == oldComment.id) {

                        return comment;
                    }
                    return oldComment;
                })
                if (newContent) {
                    postProvider?.setComments(newContent)
                    props.close();
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <textarea
                name="content"
                id="content"
                value={content}
                onChange={(e: any) => setContent(e.target.value)}
            />
            <div>
                <button type="submit">แก้ไข</button>
                <button onClick={() => props.close()}>ยกเลิก</button>
            </div>
        </form>
    )
}

export default EditCommentComponent
