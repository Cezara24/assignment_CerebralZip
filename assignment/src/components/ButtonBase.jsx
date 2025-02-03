import PropTypes from "prop-types";

function ButtonBase({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer rounded-full text-gray-700 shadow-sm bg-white border-2 border-gray-200 px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-gray-200 
      flex items-center justify-center gap-1
      ${className}`}
    >
      {children}
    </button>
  );
}

ButtonBase.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default ButtonBase;
