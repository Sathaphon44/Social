import { ThumbsUp } from 'lucide-react'
import React, { useContext } from 'react'
import { CreateLike, DeleteLike, PostLike, PostModel } from '../../../../models/post'
import { postContext } from '../../../../context/postContext';
import { authContext } from '../../../../context/authContext';
import ApiServices from '../../../../api';
const api = new ApiServices();


type PropsType = {
    post: PostModel;
}

function PostLikeComponent(props: PropsType) {
    const postProvide = useContext(postContext);
    const auth = useContext(authContext)
    const { post } = props;

    const handleActionLikePost = async (postId: number, post_like: PostLike[]) => {
        const postDetail = postProvide?.posts.find((post: PostModel) => post.id == postId)

        const amountLike = document.getElementById(`${postId}-count-like`)

        if (!post_like || post_like?.length == 0) { // add like


            if (postDetail) {

                const likeElement = document.getElementById(`${postId}-like`)
                if (likeElement && amountLike) {
                    likeElement.className = "like show"
                    amountLike.innerText = `${postDetail._count.post_like + 1} ถูกใจ`
                }

                const userId = auth?.user?.id;

                if (!userId) return;

                const data: CreateLike = {
                    postId: postId
                }

                await api.CreateLike(data)
                    .then((res: any) => {
                        postDetail.post_like = [res.data]
                        postDetail._count.post_like += 1
                    })
                    .catch((error: any) => {
                        if (likeElement && amountLike) {
                            likeElement.className = "like";
                            amountLike.innerText = `${postDetail._count.post_like} ถูกใจ`;
                        }
                    })
            }
        } else { // delete like
            const likeElement = document.getElementById(`${post_like[0].postId}-like`)
            if (postDetail) {

                if (likeElement && amountLike) {
                    likeElement.className = "like"
                    amountLike.innerText = `${postDetail._count.post_like - 1} ถูกใจ`
                }

                const data: DeleteLike = {
                    postId: post_like[0].postId
                }
                await api.DeleteLike(data)
                    .then((res: any) => {
                        postDetail.post_like = []
                        postDetail._count.post_like -= 1
                    })
                    .catch((error: any) => {
                        if (likeElement && amountLike) {
                            likeElement.className = "like show";
                            amountLike.innerText = `${postDetail._count.post_like} ถูกใจ`;
                        }
                    })
            }
        }
    }



    return (
        <button
            id={`${post.id}-like`}
            className={`like ${post?.post_like?.length > 0 && "show"}`}
            onClick={() => handleActionLikePost(post.id, post.post_like)}
        >
            <ThumbsUp />
        </button>
    )
}

export default PostLikeComponent