import React from "react";

const Alert = ({ alert }) => {
  return (
    <div
      className={`${
        alert.error ? "from-red-400 to-red-600" : "from-cyan-400 to-cyan-600"
      } bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-xs my-4`}
    >
      <p>{alert.message}</p>
    </div>
  );
};

export default Alert;
