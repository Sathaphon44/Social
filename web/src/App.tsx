import './App.css'
import Routers from './route';
import HeaderComponent from './components/header';
import FooterComponent from './components/footer';
import ContainerComponent from './components/container';


function App() {
  return (
    <div className='app-container'>
      <HeaderComponent />
      <ContainerComponent>
        <Routers />
      </ContainerComponent>
      <FooterComponent />
    </div>
  )
}

export default App
