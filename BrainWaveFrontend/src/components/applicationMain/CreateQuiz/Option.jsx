import React, {useEffect, useRef} from "react";

const Option = ({toggleCorrectOption, isCorrectOption, bgColor, number, body, setOptions, selectedQuestion}) => {

  const bodyRef = useRef()
  useEffect(() => {
    bodyRef.current.innerText = body
  },[selectedQuestion])
  
  const changeBody = (e)=>{
    setOptions(number, e.target.innerText)
  }
  return (
    <span className={` items-center flex h-fit bg-${bgColor} rounded-full py-3 px-5 cursor-pointer hover:bg-[#7486fb] text-gray-800` }>
      <span className=" pr-2 text-lg font-bold border-r-2 border-white">{number}</span>
      <div ref= {bodyRef} onKeyUp={changeBody} contentEditable="true" className="before:text-gray-600 empty:before:content-['Write_here'] outline-white inline-block mr-2 px-3 py-1 break-all w-full"></div>
      <span onClick={()=>toggleCorrectOption(number)} title="Is correct option?" className="text-3xl cursor-pointer"><i className={`fa-regular ${isCorrectOption ? 'text-green-600 fa-circle-check':'text-red-600 fa-circle-xmark'} rounded-full bg-white`}></i></span>
    </span>
  );
};

export default Option;
