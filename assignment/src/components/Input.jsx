import PropTypes from "prop-types";

function Input({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-4 py-2 rounded-full mb-4 outline-none border-none bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 placeholder-gray-400 hover:placeholder-gray-500 focus:placeholder-gray-500 ${className}`}
    />
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
