// src/components/2-molecules/InputField/input-field.component.tsx
import React from 'react';
import Input from '../../1-atoms/Input/input.component';
import './input-field.component.scss';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  return (
    <div className="input-field">
      <label className="input-field__label">{label}</label>
      <Input {...props} />
    </div>
  );
};

export default InputField;