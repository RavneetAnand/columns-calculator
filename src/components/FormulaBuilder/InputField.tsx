import React from 'react';
import { InputContainer } from './FormulaBuilder.styles';

type InputFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <InputContainer
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};
