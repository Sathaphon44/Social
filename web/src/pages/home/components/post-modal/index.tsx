import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import './style.css';
import { CommentModel, PostModel } from '../../../../models/post';
import { CircleUserRound, Ellipsis, MessageCircleMore, X } from 'lucide-react';
import moment from 'moment';
import PostLikeComponent from '../button-like';
import { authContext } from '../../../../context/authContext';
import CommentComponents from './components/comment';
import AddComment from './components/add-comment';
import ApiServices from '../../../../api';
import { postContext } from '../../../../context/postContext';
import EditPostComponent from '../post/components/edit-button';
const api = new ApiServices();

type PropsType = {
    open: boolean;
    close: React.Dispatch<React.SetStateAction<boolean>>;
    post?: PostModel;
}

function PostModalComponent(props: PropsType) {
    const authProvider = useContext(authContext);
    const postProvider = useContext(postContext);
    const [post, setPost] = useState<PostModel | undefined>(props.post)
    const [addComment, setAddComment] = useState<boolean>(false);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [editPost, setEditPost] = useState<boolean>(false);
    const menuRef: any = useRef(null);

    
    useEffect(() => {
        fetchCommentData()
    }, [authProvider])


    useEffect(() => {
        let postDetail = postProvider?.posts.find((p: PostModel) => p.id === post?.id)
        setPost(postDetail)
    }, [postProvider?.comments])

    useEffect(() => {
        if (props.open) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [props.open]);


    const fetchCommentData = async () => {
        if (post) {
            await api.GetComment(post.id)
                .then((res: any) => {
                    postProvider?.setComments(res.data)
                })
                .catch((error: any) => {

                })
        }
    }

    const handleClose = () => {
        document.body.classList.remove('no-scroll');
        props.close(false);
    }


    const handleDeletePost = async () => {

    }

    const checkTimeEditLatest = (post: PostModel) => {
        if (post.create_at == post.update_at) {
            return `${moment(new Date(post.create_at), "YYYYMMDD").locale("th").fromNow()}`
        } else {
            return `${moment(new Date(post.update_at), "YYYYMMDD").locale("th").fromNow()} แก้ไขล่าสุด`
        }
    }

    const handleClickOutside = (event: any) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpenMenu(!openMenu)
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    if (editPost) {
        return <EditPostComponent handleClose={setEditPost} post={post} />
    } else {
        return (
            <div className='post-modal-container'>
                <div className="post-modal-content">
                    <div id='post-modal-main' className='post-modal-main'>
                        <header>
                            <div className="profile-user-in-post-modal">
                                <CircleUserRound />
                                <div className='username-time-in-post'>
                                    <p>{post?.users.username}</p>
                                    <p>{post && checkTimeEditLatest(post)}</p>
                                </div>
                            </div>
                            <div>
                                {
                                    authProvider?.user && (
                                        <React.Fragment >
                                            <button onClick={() => setOpenMenu(!openMenu)}>
                                                <Ellipsis />
                                            </button>
                                            {
                                                openMenu && (
                                                    <ul ref={menuRef}>
                                                        <li onClick={() => { setEditPost(true), setOpenMenu(false)}}>edit</li>
                                                        <li onClick={handleDeletePost}>delete</li>
                                                    </ul>
                                                )
                                            }
                                        </React.Fragment>
                                    )
                                }
                                <button onClick={() => handleClose()}>
                                    <X />
                                </button>
                            </div>
                        </header>
                        <main>
                            <p>
                                {post?.content}
                            </p>
                        </main>
                        <footer>
                            <div className='count-all'>
                                <div id={`${post?.id}-count-like`} className='count_like'>
                                    <p>{post?._count.post_like} ถูกใจ</p>
                                </div>
                                <div className='count_comment'>
                                    <p>{post && post?._count.comment + post?._count.comment_feedback} ความคิดเห็น</p>
                                </div>
                            </div>
                            {
                                authProvider?.user && (
                                    <>
                                        <hr />
                                        <div className='button-action'>
                                            {post && <PostLikeComponent post={post} />}
                                            <button className='comment' onClick={() => setAddComment(!addComment)}>
                                                <MessageCircleMore />
                                            </button>
                                        </div>
                                    </>
                                )
                            }
                            <hr />
                            {
                                postProvider && postProvider?.comments?.length > 0 && (
                                    <div className='comment-all'>
                                        <p>ความคิดเห็น</p>
                                        <CommentComponents comments={postProvider.comments} />
                                    </div>
                                )
                            }
                            {
                                addComment && (
                                    <AddComment post={post} comments={postProvider ? postProvider.comments : []} />
                                )
                            }
                        </footer>
                    </div>
                </div>
            </div>
        )
    }

}

export default PostModalComponent