import PostComponent from './components/post';
import PostProvider from '../../context/postContext';
import "./style.css"

function HomePage() {

  return (
    <div className='home-container'>
      <PostProvider>
        <PostComponent />
      </PostProvider>
    </div>
  )
}

export default HomePage