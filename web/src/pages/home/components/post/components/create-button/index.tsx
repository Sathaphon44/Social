import React, { useContext, useEffect, useState } from 'react'
import "./style.css"
import { authContext } from '../../../.../../../../../context/authContext'
import { PopupComponent } from './popup';

function CreatePostComponent() {
  const auth = useContext(authContext)


  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);


  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isPopupOpen]);

  if (auth?.user) {
    return (
      <React.Fragment>
        <div className='create-post-container'>
          <header>
            <button onClick={openPopup}>คุณคิดอะไรอยู่ {auth?.user?.username}</button>
          </header>
          {
            isPopupOpen && (
              <PopupComponent handleClose={closePopup}/>
            )
          }
        </div>
      </React.Fragment>
    )
  }
}

export default CreatePostComponent