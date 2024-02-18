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
      data-testid="columnNameInput"
      type="text"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      placeholder={placeholder}
    />
  );
};
