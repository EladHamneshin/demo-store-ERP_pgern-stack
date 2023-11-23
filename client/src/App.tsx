import './App.css';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './utils/store/store';
import './App.css'

function App() {

  return (
    <>
    <Provider store = {store}>
      <Outlet />
    </Provider>
    </>
  )
}

export default App
