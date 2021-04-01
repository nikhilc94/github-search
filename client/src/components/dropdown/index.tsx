import React, { FC, ChangeEvent } from 'react';

import './index.scss';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  onOptionChange: any;
  options: Array<DropdownOption>;
}

const Dropdown: FC<DropdownProps> = ({ value, options, onOptionChange }) => {
  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onOptionChange(e.target.value);
  };

  return (
    <select value={value} className='dropdown' onChange={handleOptionChange}>
      {options.map((option: DropdownOption) => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
