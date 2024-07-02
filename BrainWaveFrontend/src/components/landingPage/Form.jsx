import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Form = ({ toggleFormState, formState }) => {

  const isJoiningRoom = false

  return (
    <section
      className={`${
        isJoiningRoom
          ? "w-[34vh] h-[30vh] overflow-hidden"
          : " h-[60vh] min-h-[480px] w-[97%] sm:w-[94%]"
      } transition-all duration-200 flex justify-center items-center relative max-w-[600px]`}
    >
      <section className="bg-frontBlue max-h-[250px] h-[65%] w-full rounded-sm flex shadow-lg shadow-[#0000002f]">
        {!isJoiningRoom && (
          <>
            <div className="h-full w-1/2 flex justify-center items-center">
              <div className="w-1/2 h-full flex justify-center items-center">
                <button
                  onClick={toggleFormState}
                  className="px-3 py-2 border-white border-2 rounded-sm font-semibold text-white cursor-pointer z-10"
                >
                  Register
                </button>
              </div>
            </div>
            <div className="h-full w-1/2 flex justify-center items-center">
              <div className="w-1/2 h-[100%] flex justify-center items-center">
                <button
                  onClick={toggleFormState}
                  className=" rounded-sm px-3 py-2 border-white border-2 font-semibold text-white z-10 cursor-pointer"
                >
                  Login
                </button>
              </div>
            </div>
          </>
        )}
      </section>
      {!isJoiningRoom && (
        <>
          <section className="h-full phone:w-[96%] tablet:w-[94%] absolute flex justify-center items-center">
          <SignUpForm formState={formState} />
            <LoginForm formState={formState} />
          </section>
        </>
      )}
    </section>
  );
};

export default Form;
