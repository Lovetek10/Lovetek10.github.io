import React from 'react';

const Button = (props) => {
	return (
        <button className="button" onClick={props.submitClick}>
          {props.buttonText}
        </button>
	);
}

export default Button;