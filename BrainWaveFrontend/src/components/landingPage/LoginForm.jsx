import React, { memo, useCallback, useState } from "react";
import AvatarStore from "./AvatarStore";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setStates } from "../../Redux/states";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({ formState }) => {
  const navigate = useNavigate()
  const dispatcher = useDispatch();


  const [userEmailInput, setUserEmailInput] = useState("");

  const [passwordInput, setPasswordInput] = useState("");

  const login = useCallback(() => {
    if (!passwordInput || !userEmailInput) {
      toast.warn("All fields are mandatory.");
      return;
    }
    axios({
      url: "http://localhost:8080/user/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: userEmailInput,
        password: passwordInput,
      },
      method: "POST",
    })
      .then(({ data }) => {
        if (data.status) {
          dispatcher(setStates({...data.data, token:data.token}))
          navigate('/home')
        }else toast.error("Something went wrong.")
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") toast.error(error.message);
        else toast.error(error.response.data.error);
      });
  }, [userEmailInput, passwordInput]);

  return (
    <div className="h-full w-1/2 overflow-hidden flex justify-center items-center">
      <div
        style={{ transition: "all 400ms" }}
        className={`w-[200%] h-[90%] relative ${
          formState === "create" ? "left-0" : "-left-[100%]"
        }`}
      >
        <div className="w-full h-full rounded-sm bg-white relative z-20 shadow-xl shadow-[#00000026] flex flex-col justify-center items-center overflow-hidden">
          <input
            style={{ transition: "all 500ms" }}
            type="text"
            className={`w-[85%] mb-6 px-3 py-2 border-2 text-sm border-gray-400 relative rounded-sm ${
              formState === "create" ? "left-0" : "-left-[100%]"
            }`}
            placeholder="Enter your email."
            value={userEmailInput}
            onChange={(e) => setUserEmailInput(e.target.value)}
          />
          <input
            style={{ transition: "all 500ms" }}
            type="password"
            className={`w-[85%] mb-6 px-3 py-2 border-2 text-sm border-gray-400 relative rounded-sm ${
              formState === "create" ? "left-0" : "-left-[100%]"
            }`}
            placeholder="Enter Password."
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <input
            style={{ transition: "all 500ms" }}
            type="button"
            value="Login"
            className={`bg-pink px-3 py-2 w-min cursor-pointer text-white text-lg relative rounded-sm ${
              formState === "create" ? "left-0" : "-left-[100%]"
            }`}
            onClick={login}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(JoinRoomForm);
