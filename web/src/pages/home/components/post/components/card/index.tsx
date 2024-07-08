import moment from 'moment'
import React, { useContext, useEffect, useRef } from 'react'
import { PostModel } from '../../../../../../models/post'
import { CircleUserRound, Ellipsis, MessageCircleMore } from 'lucide-react'
import { authContext } from '../../../../../../context/authContext'
import PostLikeComponent from '../../../button-like'


type PropsType = {
    post: PostModel;
    handleOpenMenu: any;
    openMenu: boolean;
    selectedPost?: PostModel;
    setPostInModal: React.Dispatch<React.SetStateAction<PostModel | undefined>>;
    handleEdit: (post: PostModel) => void;
    handleDelete: () => void;
    setOpenPostModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function CardPostComponent(props: PropsType) {
    const auth = useContext(authContext);
    const menuRef: any = useRef(null);


    const handleClickOutside = (event: any) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            props.handleOpenMenu(props.post)
        } else {
            props.handleOpenMenu(!props.post)
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const checkTimeEditLatest = (post: PostModel) => {
        if (post.create_at == post.update_at) {
            return moment(new Date(post.create_at), "YYYYMMDD").locale("th").fromNow()
        } else {
            return `${moment(new Date(post.update_at), "YYYYMMDD").locale("th").fromNow()} แก้ไขล่าสุด`
        }
    }

    return (
        <div className='post-content'>
            <header>
                <div className='profile-user'>
                    <CircleUserRound />
                    <div>
                        <span>{props.post.users.username}</span>
                        <span id={`${props.post.id}`}>{checkTimeEditLatest(props.post)}</span>
                    </div>
                </div>
                {
                    auth?.user?.id == props.post?.userId && (
                        <div className='menu' ref={menuRef}>
                            <button onClick={() => props.handleOpenMenu(props.post)}>
                                <Ellipsis />
                            </button>
                            <div className={`menu-list ${props.openMenu && props.selectedPost?.id == props.post.id && "show"}`}>
                                <ul>
                                    <li onClick={() => props.handleEdit(props.post)}>edit</li>
                                    <li onClick={props.handleDelete}>delete</li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            </header>
            <main>
                <p id={`${props.post.id}`}>{props.post.content}</p>
            </main>
            <footer>
                <div className='count-all'>
                    <div id={`${props.post.id}-count-like`} className='count_like'>
                        <p>{props.post._count.post_like} ถูกใจ</p>
                    </div>
                    <div className='count_comment'>
                        <p onClick={() => {
                            props.setOpenPostModal(true)
                            props.setPostInModal(props.post)
                        }}>
                            {props.post._count.comment + props.post._count.comment_feedback} ความคิดเห็น
                        </p>
                    </div>
                </div>
                {
                    auth?.user && (
                        <>
                            <hr />
                            <div className='button-action'>
                                <PostLikeComponent post={props.post} />
                                <button className='comment' onClick={() => {
                                    props.setOpenPostModal(true)
                                    props.setPostInModal(props.post)
                                }}>
                                    <MessageCircleMore />
                                </button>
                            </div>
                        </>
                    )
                }
            </footer>
        </div>

    )
}

export default CardPostComponent