import React from 'react'

const Footer = ({saveQuiz}) => {
  return (
    
    <div className="z-20 flex justify-center items-center w-full h-12 bg-backBlue sticky bottom-0">
        <input className='cursor-pointer hover:bg-red-300 rounded-sm right-[4%] p-2 text-white bg-pink' value="Save" type='button' onClick={saveQuiz}/>
    </div>
  )
}

export default Footer