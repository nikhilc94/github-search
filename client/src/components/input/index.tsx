import React, { FC, ChangeEvent } from 'react';

import './index.scss';

interface InputProps {
  value: string;
  autoFocus?: boolean;
  onInputChange: any;
  placeholder: string;
}

const Input: FC<InputProps> = ({
  value,
  autoFocus,
  placeholder,
  onInputChange,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  return (
    <input
      type='text'
      value={value}
      autoFocus={autoFocus}
      className='input-field'
      placeholder={placeholder}
      onChange={handleInputChange}
    />
  );
};

export default Input;
