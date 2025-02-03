import PropTypes from "prop-types";

function Card({ 
  className = "", 
  children,
  height,
}) {
  return (
    <div
      className={`bg-gray-100 rounded-3xl shadow-md ${className}`}
      style={height ? { height } : {}}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string,
};

export default Card;
