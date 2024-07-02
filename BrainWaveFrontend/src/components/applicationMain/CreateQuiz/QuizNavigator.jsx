import React, {useState} from 'react'

const QuizNavigator = ({selectedQuestion, name, setName, questions, setQuestions, setSelectedQuestion}) => {
  const addQuestion=()=>{
    setQuestions(question=>[...question, {
      id:question.length+1,
      body:'',
      options:[{id:1, body:''}]
    }]);
  }
  return (
    <section className='overflow-y-scroll h-full flex-grow bg-frontBlue flex flex-col items-center'>
      <div className=' gap-2 flex flex-row flex-wrap justify-start max-w-11/12 h-max p-4 mt-16'>
        <input value={name} className=' w-11/12 px-2' placeholder='Quiz name' onChange={(e)=>setName(e.target.value)} type="text"/>
        {questions.map(question=><span key={question.id} onClick={()=>setSelectedQuestion(question.id)} className={` cursor-pointer rounded-sm ${selectedQuestion===question.id?'bg-blue-500':'bg-backBlue'}  flex justify-center items-center w-10 h-10 text-white`}>{question.id}</span>)}
        <button onClick={addQuestion} className=" text-white cursor-pointer flex justify-center items-center h-10 w-10 p-1 rounded-full border-4 border-white "><i className="fa-solid fa-plus w-4 h-4"></i></button>    
      </div>
    </section>
  )
}

export default QuizNavigator