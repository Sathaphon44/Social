import React from 'react'
import { CommentFeedbackModel } from '../../../../../../../models/post'
import { CircleUserRound } from 'lucide-react';
import "./style.css"
import moment from 'moment';

type PropsType = {
  data: CommentFeedbackModel[];
}

function CommentFeedback(props: PropsType) {


  const checkTimeEditLatest = (commentFeedback: CommentFeedbackModel) => {
    if (commentFeedback.create_at == commentFeedback.update_at) {
      return `${moment(new Date(commentFeedback.create_at), "YYYYMMDD").locale("th").fromNow()}`
    } else {
      return `${moment(new Date(commentFeedback.update_at), "YYYYMMDD").locale("th").fromNow()} แก้ไขล่าสุด`
    }
  }


  return props.data.map((commentFeedback: CommentFeedbackModel, index: number) => (
    <div id={`commentFeedback-${commentFeedback.id}`} className='commentFeedback-container' key={index}>
      <header>
        <span><CircleUserRound /></span>
      </header>
      <main>
        <div>
          <span>{commentFeedback.users.username}</span>
          <span>{commentFeedback.content}</span>
        </div>
        <span>{checkTimeEditLatest(commentFeedback)}</span>
      </main>
    </div>
  )
  )
}

export default CommentFeedback