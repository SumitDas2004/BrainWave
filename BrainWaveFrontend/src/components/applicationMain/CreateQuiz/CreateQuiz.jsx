import React, {useEffect, useState} from 'react'
import CreateQuizStage from './CreateQuizStage'
import QuizNavigator from './QuizNavigator'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom'

const CreateQuiz = () => {
  const navigate = useNavigate()
  const authToken = useSelector(state=>state.states.authenticationToken);
  const [name, setName] = useState('')
  const [questions, setQuestions] = useState([{
    id:1,
    body:'',
    options:[{id:1, body:'', correctOption:false}]
  }])

  const saveQuiz = ()=>{
    axios({
      url:'https://brainwave-ruzq.onrender.com/quiz/create',
      headers:{
        'Content-Type':'application/json',
        "Authorization":'Bearer '+authToken
      },
      data:{
        name:name,
        questions:questions
      },
      method:"POST"
    }).then(res=>{toast.success(
      'Quiz '+res.data.data.name+' created successfully. QuizId: '+ res.data.data.id)
      navigate('/home')
    })
    .catch(err=>toast.error(err.response.data.error))
  }

  useEffect(() => {
    if(!authToken)
      navigate("/")
  }, [])
  


  const [selectedQuestion, setSelectedQuestion] = useState(1)
  return (
    <div className='h-full w-full grid grid-cols-4'>
        <Navbar/>
        <QuizNavigator name={name} setName={setName} selectedQuestion={selectedQuestion} setSelectedQuestion={setSelectedQuestion} questions={questions} setQuestions={setQuestions}/>
        <CreateQuizStage saveQuiz={saveQuiz} selectedQuestion={selectedQuestion} questions={questions} setQuestions={setQuestions}/>
    </div>
  )
}

export default CreateQuiz