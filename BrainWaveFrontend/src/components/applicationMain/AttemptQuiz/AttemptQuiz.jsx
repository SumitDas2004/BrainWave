import React, { useEffect, useState } from "react";
import AttemptQuizStage from "./AttemptQuizStage";
import QuizNavigator from "./QuizNavigator";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const AttemptQuiz = () => {
  const [quiz, setQuiz] = useState();
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const authToken = useSelector((state) => state.states.authenticationToken);
  const navigate = useNavigate();
  const { id } = useParams();
  const [qandA, setQandA]= useState([])

  useEffect(() => {
    if(quiz)
    setQandA(quiz.questions.map(question=>{return {questionNo:question.questionNo, answerNo:0}}))
  }, [quiz])
  

  const getQuestions = (id, authenticationToken) => {
    axios({
      url: "http://localhost:8080/quiz/" + id,
      method: "GET",
      headers: {
        Authorization: "Bearer " + authenticationToken,
      },
    })
      .then(({ data }) => {
        setQuiz(data.data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
        navigate("/home");
      });
  };
  const changeSelection = (optionNo)=>{
    setQandA(pairs=>pairs.map(pair=>{
      if(pair.questionNo!==selectedQuestion)return pair
      else{
        return {
          ...pair,
          answerNo:optionNo
        }
      }
    }))
  }

  const submitQuiz = (authenticationToken)=>{
    axios({
      url:"http://localhost:8080/quiz/submit",
      method: "POST",
      headers: {
        Authorization: "Bearer " + authenticationToken,
      },
      data:{
        quizId:quiz.id,
        questionAndAnswers:qandA
      }
    }).then(({data})=>{
      toast.success(`${data.message} You have scored ${data.data.totalCorrect}/${data.data.totalQuestion}`)
      navigate('/home')
    })
    .catch(err=>toast.error('Something went wrong.'))
  }
  
  useEffect(() => {
    if (!authToken) navigate("/");
    getQuestions(id, authToken);
  }, []);
  return (
    <div className="h-full w-full  grid grid-cols-4">
      <Navbar />
      {quiz && <QuizNavigator
        selectedQuestion={selectedQuestion}
        setSelectedQuestion={setSelectedQuestion}
        questions={quiz.questions}
        quiz={quiz}
      />}
      {quiz && <AttemptQuizStage
        selectedQuestion={selectedQuestion}
        setSelectedQuestion={setSelectedQuestion}
        questions={quiz.questions}
        changeSelection={changeSelection}
        qandA={qandA}
        submitQuiz = {submitQuiz}
      />
      }
    </div>
  );
};

export default AttemptQuiz;
