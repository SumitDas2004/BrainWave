import React from 'react'
import { useSelector } from "react-redux";

const Footer = ({ submitQuiz, selectedQuestion, setSelectedQuestion, questions}) => {
  const authToken = useSelector(state=>state.states.authenticationToken);
  return (
    <div className="flex justify-center items-center w-full h-16 bg-backBlue sticky absolute-0 left-0">
        {/* <input className='hover:bg-[#00000026] cursor-pointer px-2 py-1 text-white border-2 border-white' value="Mark" type='button'/> */}
        <input onClick={()=>setSelectedQuestion(selectedQuestion===questions.length?1:(selectedQuestion+1))} className='cursor-pointer hover:bg-red-300 rounded-sm absolute right-4 p-2 text-white bg-pink' value="Next" type='button'/>
        {selectedQuestion===questions.length && <input className='cursor-pointer hover:bg-red-300 rounded-sm absolute right-20 p-2 text-white bg-red-500' value="Submit" onClick={()=>submitQuiz(authToken)} type='button'/>}
    </div>
  )
}

export default Footer