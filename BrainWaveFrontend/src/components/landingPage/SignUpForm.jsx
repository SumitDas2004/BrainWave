import React, { memo, useCallback, useState } from "react";
import AvatarStore from "./AvatarStore";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setStates } from "../../Redux/states";
import { useNavigate } from "react-router-dom";

const CreateRoomForm = ({ formState }) => {
  const navigate = useNavigate()

  const dispatcher = useDispatch()

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const register = useCallback(() => {
    if(passwordInput!==confirmPasswordInput){
      toast.warn("Passwords do not match.")
      return ;
    }
    if(!passwordInput || !confirmPasswordInput || !emailInput || !nameInput || !userAvatar){
      toast.warn("All fields are mandatory.")
      return ;
    }
    axios({
      url:"https://brainwave-ruzq.onrender.com/user/register", 
      headers: {
        "Content-Type": "application/json",
      },
      data:{
        'email': emailInput,
        'password': passwordInput,
        'name': nameInput,
        'avatar': userAvatar
      },
      method: "POST",
    }).then(({ data }) => {
      if (data.status) {
        dispatcher(setStates({...data.data, token:data.token}))
        navigate('/home')
      }else toast.error("Something went wrong.")
    }).catch((error)=>{
      console.log(error)
      if(error.code==='ERR_NETWORK')toast.error(error.message)
      else
      toast.error(error.response.data.error)
    })
  }, [emailInput, passwordInput, confirmPasswordInput, nameInput, userAvatar]);

  return (
    <div className="h-full w-1/2 overflow-hidden flex justify-center items-center">
      <div
        style={{ transition: "all 400ms" }}
        className={`w-[200%] h-[90%] relative ${
          formState !== "create" ? "left-0" : "left-[100%]"
        }`}
      >
        <div className="w-full h-full rounded-sm bg-white relative z-20 shadow-xl shadow-[#00000026] flex flex-col justify-center items-center overflow-hidden">
          <AvatarStore
            className={`${formState !== "create" ? "left-0" : "left-[100%]"}`}
            setPlayerAvatar={setUserAvatar}
          />
          <input
            style={{ transition: "all 500ms" }}
            type="text"
            className={`w-[85%] mb-3 px-3 py-2 border-2 text-md border-gray-400 relative text-sm rounded-sm ${
              formState !== "create" ? "left-0" : "left-[100%]"
            }`}
            placeholder="Enter your nane."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <input
            style={{ transition: "all 500ms" }}
            type="text"
            className={`w-[85%] mb-3 px-3 py-2 border-2 text-md border-gray-400 relative text-sm rounded-sm ${
              formState !== "create" ? "left-0" : "left-[100%]"
            }`}
            placeholder="Enter your email."
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <input
            style={{ transition: "all 500ms" }}
            type="password"
            className={`w-[85%] mb-3 px-3 py-2 border-2 text-md border-gray-400 relative text-sm rounded-sm ${
              formState !== "create" ? "left-0" : "left-[100%]"
            }`}
            placeholder="Enter password."
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <input
            style={{ transition: "all 500ms" }}
            type="password"
            className={`w-[85%] mb-3 px-3 py-2 border-2 text-md border-gray-400 relative text-sm rounded-sm ${
              formState !== "create" ? "left-0" : "left-[100%]"
            }`}
            placeholder="Confirm password."
            value={confirmPasswordInput}
            onChange={(e) => setConfirmPasswordInput(e.target.value)}
          />
          <input
            style={{ transition: "all 500ms" }}
            type="button"
            value="Register"
            className={`bg-pink px-3 py-2 w-min cursor-pointer text-white text-lg rounded-sm relative ${
              formState !== "create" ? "left-0" : "left-[100%]"
            }`}
            onClick={register}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(CreateRoomForm);
