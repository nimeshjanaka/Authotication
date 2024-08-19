import React from "react";
import classNames from "classnames"; // You can install classnames using npm install classnames

interface Props {
  passStrength: number;
}

const PasswordStrength = ({ passStrength }: Props) => {
  return (
    <div className="flex gap-2 col-span-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={classNames("h-2 w-2 rounded-full", {
            "bg-red-500": index === 0 && passStrength >= 0,
            "bg-yellow-500": index === 1 && passStrength >= 1,
            "bg-green-500": index === 2 && passStrength >= 2,
            "bg-blue-500": index === 3 && passStrength >= 3,
          })}
        ></div>
      ))}
    </div>
  );
};

export default PasswordStrength;
