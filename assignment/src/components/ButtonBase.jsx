import PropTypes from "prop-types";
import { useState } from "react";
import { PiCaretDownBold as CaretDown } from "react-icons/pi";
import { PiCaretUpBold as CaretUp } from "react-icons/pi";

function ButtonBase({
  children,
  onClick,
  type = "button",
  className = "",
  multipleOptions,
  options = [],
  defaultOption,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    defaultOption || children
  );

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onClick) onClick(option);
  };

  return (
    <div className="relative inline-block">
      <button
        type={type}
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer rounded-full text-gray-700 shadow-sm bg-white border-2 border-gray-200 px-4 py-1 transition-colors duration-200 ease-in-out hover:bg-gray-200 
        flex items-center justify-center gap-1
        ${className}`}
      >
        {selectedOption}{" "}
        {multipleOptions &&
          (!isOpen ? (
            <CaretDown className="text-gray-400"></CaretDown>
          ) : (
            <CaretUp className="text-gray-400"></CaretUp>
          ))}
      </button>

      {multipleOptions && isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ButtonBase.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  multipleOptions: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
  defaultOption: PropTypes.string,
};

export default ButtonBase;
