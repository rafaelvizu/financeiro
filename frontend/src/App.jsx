import './App.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Router from './Router'

function App() {

  return (
    <>
      <ToastContainer autoClose={2000}/>
      <Router/>
    </>
  )
}

export default App
