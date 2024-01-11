import PropTypes from "prop-types";

const Button = ({icon, text, onClick}) => {
  return(
    <button 
      className="w-1/3 rounded flex justify-center items-center gap-x-2 hover:bg-gray-100"
      onClick={onClick}
    >
      <span>{icon}</span>
      <span className="text-[15px] text-gray-500 font-medium">{text}</span>
    </button>
  )
}

Button.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  onClick: PropTypes.func
};


export default Button;