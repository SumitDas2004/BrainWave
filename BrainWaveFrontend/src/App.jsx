import React from 'react'
import { ToastContainer } from 'react-toastify'
import LandingPage from './components/landingPage/LandingPage'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateQuiz from './components/applicationMain/CreateQuiz/CreateQuiz';
import AttemptQuiz from './components/applicationMain/AttemptQuiz/AttemptQuiz';
import Dashboard from './components/applicationMain/Dashboard';

const App = () => {
  const loginRoute = createBrowserRouter([
    {
      path:'/',
      element:<LandingPage/>
    },{
      path:'/quiz/attempt/:id',
      element:<AttemptQuiz/>
  
    },{
      path:'/quiz/create',
      element:<CreateQuiz/>
  
    },{
      path:'/home',
      element:<Dashboard/>
    }
  ])

  const authToken = useSelector(state=>state.states.authenticationToken)
  return (
    <div className='h-screen w-screen'>
        <RouterProvider router={loginRoute}/>
      <ToastContainer newestOnTop theme='colored'/>
    </div>
  )
}

export default App