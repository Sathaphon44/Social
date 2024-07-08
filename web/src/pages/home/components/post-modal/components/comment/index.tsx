import React, { useContext, useEffect, useRef, useState } from 'react'
import { CommentModel, DeleteComment, PostModel } from '../../../../../../models/post'
import "./style.css"
import { authContext } from '../../../../../../context/authContext';
import { CircleUserRound, EllipsisVertical } from 'lucide-react';
import moment from 'moment';
import ApiServices from '../../../../../../api';
import { postContext } from '../../../../../../context/postContext';
import EditCommentComponent from './edit-comment';
import CommentFeedback from './comment_feedback';
import AddCommentFeedback from './add-comment-feedback';
const api = new ApiServices();
type PropsType = {
  comments: CommentModel[];
}

function CommentComponents(props: PropsType) {
  const authProvider = useContext(authContext);
  const postProvider = useContext(postContext);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<CommentModel>();
  const [edit, setEdit] = useState<boolean>(false)
  const [addCommentFeedback, setAddCommentFeedback] = useState<boolean>(false)
  const menuRef: any = useRef(null);




  const checkTimeEditLatest = (comment: CommentModel) => {
    if (comment.create_at == comment.update_at) {
      return `${moment(new Date(comment.create_at), "YYYYMMDD").locale("th").fromNow()}`
    } else {
      return `${moment(new Date(comment.update_at), "YYYYMMDD").locale("th").fromNow()} แก้ไขล่าสุด`
    }
  }


  const handleCloseMenu = (comment: CommentModel) => {
    if (comment.id === selectedComment?.id) {
      setOpenMenu(false);
      setSelectedComment(undefined);
    } else {
      setEdit(false);
      setAddCommentFeedback(false);
      setOpenMenu(true);
      setSelectedComment(comment);
    }
  }


  const handleDeleteComment = async () => {
    if (selectedComment) {
      const commentId = selectedComment.id;
      const postId = selectedComment.postId;
      const data: DeleteComment = {
        id: commentId
      }
      await api.DeleteComment(data)
        .then((res: any) => {
          const newComments: CommentModel[] | undefined = postProvider?.comments.filter((comment: CommentModel) => comment.id !== commentId);
          const newPosts: PostModel[] | undefined = postProvider?.posts.map((post: PostModel) =>
            post.id === postId ? {
              ...post,
              _count: {
                ...post._count,
                comment: post._count.comment - 1
              }
            } : post
          );
          if (newComments && newPosts) {
            postProvider?.setComments(newComments);
            postProvider?.setPosts(newPosts);
            alert("The comment has been successfully deleted.")
          }
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
  }

  const closeEditComment = () => {
    setEdit(false);
    setOpenMenu(false);
    setSelectedComment(undefined);
  }


  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenu(false);
      setSelectedComment(undefined);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleReplyCommentFeedback = async (comment: CommentModel) => {
    setSelectedComment(comment)
    setAddCommentFeedback(true)
    setTimeout(() => {
      let element = document.getElementById("add-commentFeedback");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 200)
  }


  return props.comments.map((comment: CommentModel, index: number) => (
    <div key={index} className='comment-container'>
      <div className="comment-content">
        <div className="comment-card">
          <header>
            <span><CircleUserRound /></span>
          </header>
          <main>
            <div>
              <span>{comment.users.username}</span>
              {
                edit && selectedComment?.id === comment.id ?
                  <EditCommentComponent comment={comment} close={closeEditComment} />
                  :
                  <span>
                    {comment.content}
                  </span>
              }
            </div>
            <div>
              <span>{checkTimeEditLatest(comment)}</span>
              <ul>
                <li onClick={() => handleReplyCommentFeedback(comment)}>ตอบกลับ</li>
              </ul>
            </div>
            {
              comment.comment_feedback.length > 0 && (
                <CommentFeedback data={comment.comment_feedback} />
              )
            }
          </main>
          {
            authProvider?.user && (
              <footer>
                <button onClick={() => handleCloseMenu(comment)}>
                  <EllipsisVertical />
                </button>
                {
                  openMenu && selectedComment?.id === comment.id && (
                    <div className='comment-menu' ref={menuRef}>
                      <ul>
                        <li onClick={() => { setEdit(true), setOpenMenu(false) }}>edit</li>
                        <li onClick={handleDeleteComment}>delete</li>
                      </ul>
                    </div>
                  )
                }
              </footer>
            )
          }
        </div>
      </div>
      <div className='comment-feedback-container'>
        {
          !edit && addCommentFeedback && selectedComment?.id == comment.id && (
            <AddCommentFeedback comment={comment} />
          )
        }
      </div>
    </div>
  ));
}

export default CommentComponents