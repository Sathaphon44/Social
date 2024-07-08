import React, { useContext, useEffect, useRef, useState } from 'react'
import { PostModel } from '../../../../models/post';
import "./style.css"
import { postContext } from "../../../../context/postContext";
import ApiServices from '../../../../api';
import moment from 'moment';
moment.locale("th");
import EditPostComponent from './components/edit-button';
import CreatePostComponent from './components/create-button';
import PostModalComponent from '../post-modal';
import CardPostComponent from './components/card';
const api = new ApiServices();



export default function PostCardComponent() {
    const post = useContext(postContext);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [selectedPost, setSelectedPost] = useState<PostModel | undefined>(undefined);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openPostModal, setOpenPostModal] = useState<boolean>(false)
    const [postInModal, setPostInModal] = useState<PostModel | undefined>(undefined);
    

    const handleOpenMenu = (post: PostModel) => {
        if (selectedPost?.id != post.id) {
            setOpenMenu(true)
            setSelectedPost(post)
        } else {
            setOpenMenu(!openMenu)
            setSelectedPost(post)
        }
    }


    const handleEdit = (post: PostModel) => {
        setSelectedPost(post)
        setOpenModalEdit(true)
    }

    const handleDelete = async () => {
        if (selectedPost) {
            const data = { id: selectedPost?.id };
            await api.DeletePost(data)
            post?.rePost()
        }
    }


    return (
        <div className='post-container'>
            <CreatePostComponent />
            {openPostModal &&
                <PostModalComponent open={openPostModal} close={setOpenPostModal} post={postInModal} />
            }
            {
                openModalEdit && <EditPostComponent post={selectedPost} handleClose={setOpenModalEdit} />
            }
            {
                post?.posts?.length ?
                    post.posts.map((post: PostModel, index: React.Key) => (
                        <React.Fragment key={index}>
                            <CardPostComponent
                                post={post}
                                handleOpenMenu={handleOpenMenu}
                                openMenu={openMenu}
                                selectedPost={selectedPost}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                setPostInModal={setPostInModal}
                                setOpenPostModal={setOpenPostModal}
                            />
                        </React.Fragment>
                    ))
                    :
                    <div className='non-post'>
                        <p>ยังไม่มีเนื้อหาในขณะนี้</p>
                    </div>
            }
        </div>
    )
}
