import React from "react";

const Spinner = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-20 h-20 rounded-full border-t border-l border-white animate-spin" />
    </div>
  );
};

export default Spinner;
