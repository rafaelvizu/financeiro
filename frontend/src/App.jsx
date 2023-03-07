import { Provider } from 'react-redux'

import store from './store'
import './App.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Router from './Router'

function App() {

  return (
    <>
      <ToastContainer autoClose={2000}/>
      <Provider store={store}>
        <Router/>
      </Provider>
    </>
  )
}

export default App
