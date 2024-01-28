import React from 'react';
import styles from './Button.module.css';

const Button = ({ className, children, ...props }) => {
  return (
    <button className={`button ${className ? className : styles.button}`} {...props}>
      {children}
    </button>
  );
};


export default Button;
