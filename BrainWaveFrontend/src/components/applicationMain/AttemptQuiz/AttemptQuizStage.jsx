import React from "react";
import Option from "./Option";
import Footer from "./Footer";

const AttemptQuizStage = ({
  changeSelection,
  questions,
  selectedQuestion,
  setSelectedQuestion,
  qandA,
  submitQuiz
}) => {
  

  return (
    <section className=" relative h-full flex-grow-[3] flex flex-col justify-start items-center col-span-3 ">
      <div className=" w-[90%] ml-4 mt-28 mb-4 min-w-[300px]">
        Q.{selectedQuestion}
      </div>
      <div
        className=" break-all pointer-events-none select-none rounded-sm text-gray-800 min-w-[300px] bg-gray-100 text-lg min-h-[200px] w-[90%] flex items-center p-[3%]
        "
      >
        {
          questions.filter((question) => {
            if (question.questionNo === selectedQuestion) return true;
          })[0].question
        }
      </div>
      <div className=" text-gray-800 min-w-[300px] text-lg w-[90%] grid md:grid-cols-2 gap-3 mt-6">
        {questions
          .filter((question) => {
            if (question.questionNo === selectedQuestion) return true;
          })[0]
          .options.map((op) => (
            <Option
              key={op.optionNo}
              body={op.body}
              optionNo={op.optionNo}
              changeSelection={changeSelection}
              qandA = {qandA}
              selectedQuestion={selectedQuestion}
            />
          ))}
      </div>
      <div className="flex-grow"></div>
      <Footer
        selectedQuestion={selectedQuestion}
        setSelectedQuestion={setSelectedQuestion}
        questions={questions}
        submitQuiz={submitQuiz}
      />
    </section>
  );
};

export default AttemptQuizStage;
