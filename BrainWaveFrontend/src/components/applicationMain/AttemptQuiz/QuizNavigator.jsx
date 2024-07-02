import React from 'react'

const QuizNavigator = ({quiz, questions, selectedQuestion, setSelectedQuestion}) => {
  return (
    <section className='overflow-y-scroll h-full flex-grow bg-frontBlue flex flex-col items-center'>
      <span className='mt-20 text-white self-start ml-6'>Quiz: {quiz.name}</span>
      <span className='text-white self-start ml-6'>Id: {quiz.id}</span>
      <span className='text-white self-start ml-6'>Created by: {quiz.userName}</span>
      <div className=' gap-2 flex flex-row flex-wrap justify-start max-w-11/12 h-max p-4'>
        {questions.map(question=><span key={question.questionNo} onClick={()=>{setSelectedQuestion(question.questionNo)}} className={` cursor-pointer rounded-sm ${selectedQuestion===question.questionNo?'bg-blue-500':'bg-backBlue'}  flex justify-center items-center w-10 h-10 text-white`}>{question.questionNo}</span>)}
      </div>
    </section>
  )
}

export default QuizNavigator