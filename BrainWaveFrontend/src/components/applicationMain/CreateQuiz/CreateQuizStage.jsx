import React, { useState, useEffect, useRef } from "react";
import Option from "./Option";
import Footer from "./Footer";

const CreateQuizStage = ({saveQuiz, selectedQuestion, questions, setQuestions }) => {
  const questionContainer = useRef();

  useEffect(()=>{
    let q = questions.filter(q=>q.id===selectedQuestion && q)[0]
    questionContainer.current.innerText = q.body;
  }, [selectedQuestion])

  const addOption = () => {
    setQuestions((questions) =>
      questions.map((q) => {
        if (q.id === selectedQuestion)
          return {
            ...q,
            options: [...q.options, { id: q.options.length + 1, body: "", correctOption:false }],
          };
        else return q;
      })
    );
  };

  const setOptions = (id, data) => {
    setQuestions((questions) =>
      questions.map((q) => {
        if (q.id === selectedQuestion)
          return {
            ...q,
            options: q.options.map((op) => {
              if (id === op.id)
                return {
                  ...op,
                  body: data,
                };
              else return op;
            }),
          };
        else return q;
      })
    );
  };

  const toggleCorrectOption = (id)=>{
    setQuestions((questions) =>
      questions.map((q) => {
        if (q.id === selectedQuestion)
          return {
            ...q,
            options: q.options.map((op) => {
              if (id === op.id)
                return {
                  ...op,
                  correctOption: !op.correctOption,
                };
              else return op;
            }),
          };
        else return q;
      })
    );
  }

  return (
    <section className=" overflow-y-scroll relative h-full flex-grow-[3] flex flex-col justify-start items-center col-span-3 ">
      <div className=" w-[90%] ml-4 mt-28 mb-4 min-w-[300px]">
        Q.{selectedQuestion}
      </div>
      <div
        ref={questionContainer}
        contentEditable
        className=" before:text-gray-400 empty:before:content-['Add_question_here'] cursor-text break-all rounded-sm text-gray-800 min-w-[300px] bg-gray-100 text-lg min-h-[200px] w-[90%] flex items-center p-[3%]
        "
        onKeyUp={(e) => {
          setQuestions((questions) =>
            questions.map((q) => {
              if (q.id === selectedQuestion)
                return { ...q, body: e.target.innerText };
              else return q;
            })
          );
        }}
      ></div>
      <div className="pb-8 text-gray-800 min-w-[300px] text-lg w-[90%] grid md:grid-cols-2 gap-3 mt-6">
        {questions
          .filter((question) => question.id === selectedQuestion && question)[0]
          .options.map((op) => (
            <Option
              isCorrectOption={op.correctOption}
              selectedQuestion={selectedQuestion}
              setOptions={setOptions}
              bgColor="frontBlue"
              key={op.id}
              number={op.id}
              body={op.body}
              toggleCorrectOption={toggleCorrectOption}
            />
          ))}
        <button
          onClick={addOption}
          className=" cursor-pointer m-auto flex justify-center items-center h-8 w-8 p-1 rounded-full border-2 border-black "
        >
          <i className="fa-solid fa-plus w-4 h-4"></i>
        </button>
      </div>
      <div className="flex-grow"></div>
      <Footer saveQuiz={saveQuiz} />
    </section>
  );
};

export default CreateQuizStage;
