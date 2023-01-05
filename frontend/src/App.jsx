import './App.css'
import RouteApp from './Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
      <ToastContainer autoClose={2000}/>
      <RouteApp/>
    </>
  )
}

export default App
