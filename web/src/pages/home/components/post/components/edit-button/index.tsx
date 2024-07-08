import React, { FormEvent, ReactElement, useContext, useState } from 'react'
import { PostModel } from '../../../../../../models/post'
import "./style.css"
import { X } from 'lucide-react';
import ApiServices from '../../../../../../api';
import { postContext } from '../../../../../../context/postContext';
const api = new ApiServices();

type PropsType = {
    post?: PostModel;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditPostComponent(props: PropsType) {
    const post = useContext(postContext)
    const [newContent, setNewContent] = useState(props.post?.content)

    const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newContent == "") {
            return alert("กรุณาใส่เนื้อหาที่จะแก้ไข");
        } else {

            if (!props.post?.id || !newContent) return alert("เกิดข้อผิดพลาด");

            const data = { id: props.post?.id, content: newContent };
            await api.EditPost(data)
                .then((res: any) => {
                    post?.rePost();
                    props.handleClose(false);
                    return alert("แก้ไขโพสต์เรียบร้อย");
                })
                .catch((error: any) => {
                    console.log(error)
                    return alert("แก้ไขโพสต์ไม่สำเร็จ");
                });
        }
    }

    return (
        <div className='popup-edit'>
            <div className='form-popup-edit'>
                <header>
                    <h3>แก้ไขโพสต์</h3>
                    <button onClick={() => props.handleClose(false)}><X /></button>
                </header>
                <main>
                    <form onSubmit={handleEdit}>
                        <textarea value={newContent} onChange={(e: any) => setNewContent(e.target.value)} />
                        <button type='submit'>แก้ไขโพสต์</button>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default EditPostComponent