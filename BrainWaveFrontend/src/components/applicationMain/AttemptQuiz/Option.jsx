import React, { useEffect, useState } from "react";

const Option = ({ optionNo, body, changeSelection, qandA, selectedQuestion }) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    let found = false;
    for(let i=0;i<qandA.length;i++){
      if(selectedQuestion===qandA[i].questionNo && optionNo===qandA[i].answerNo){
        found = true;
      }
    }
    setIsSelected(found)
    
  }, [qandA, selectedQuestion]);
  return (
    <span
      onClick={() => changeSelection(optionNo)}
      className={`select-none items-center flex h-fit ${
        isSelected ? "bg-green-400 hover:bg-green-300" : 'hover:bg-[#7486fb] bg-frontBlue'
      } rounded-full py-3 px-5 cursor-pointer`}
    >
      <span className=" pr-2 text-lg font-bold border-r-2 border-white">
        {optionNo}
      </span>
      <span className="inline-block mx-2 break-all">{body}</span>
    </span>
  );
};

export default Option;
