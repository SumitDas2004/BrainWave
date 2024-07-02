import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const navigate = useNavigate()
  const authToken = useSelector(state=>state.states.authenticationToken);
  const [quizId, setQuizId] = useState('')

    useEffect(() => {
      if(!authToken)
        navigate("/")
    }, [])
    
  return (
    <section className='w-full h-full flex justify-center bg-backBlue'>
        <Navbar/>
        <div className= 'flex mt-28 gap-20'>
            <span className='h-48 w-48 shadow-lg hover:scale-110 transition-all cursor-pointer bg-slate-100 rounded-lg flex justify-center items-center text-gray-700'><button onClick={()=>navigate("/quiz/create")} className="bg-pink text-white px-2 py-1 rounded-md">Create quiz</button></span>
            <span className='h-48 w-48 shadow-lg hover:scale-110 transition-all cursor-pointer bg-slate-100 rounded-lg flex justify-center items-center text-gray-700 flex-col'>
                <input value={quizId} onChange={(e)=>setQuizId(e.target.value)} type='text' placeholder='Enter quiz id' className=' w-11/12 rounded-md shadow-sm shadow-[black] mb-8 px-2 py-1'/>
                <button onClick={()=>navigate(`/quiz/attempt/${quizId}`)} className="bg-pink text-white px-2 py-1 rounded-md">Attempt quiz</button>
            </span>
        </div>
    </section>
  )
}

export default Dashboard