import React from 'react';
import styles from './Input.module.css';
import Error from '../Helper/Error';

const Input = ({ label, type, name, value, onChange, error, onBlur, readOnly   }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`${styles.input} ${readOnly ? styles.readOnly : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly} // Propriedade readOnly

      />
  <Error error={error} />
    </div>
  );
};

export default Input;
