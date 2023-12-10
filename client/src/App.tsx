import './App.css';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store'
import './App.css'
import AppBar from './components/AppBar'

function App() {

  return (
    <>
    <Provider store = {store}>
        <AppBar/>
      <Outlet />
    </Provider>
    </>
  )
}

export default App
