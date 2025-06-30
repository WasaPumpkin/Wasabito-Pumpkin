// src/components/2-molecules/InputField/input-field.component.tsx
import React from 'react';
import Input from '../../1-atoms/Input/input.component';
import './input-field.component.scss';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null; 
}

const InputField: React.FC<InputFieldProps> = ({ label, error, ...props }) => {
  
  const containerClassName = `input-field ${error ? 'input-field--error' : ''}`;
  return (
    <div className={containerClassName}>
      <label className="input-field__label">{label}</label>
      <Input      
        hasError={!!error}
        {...props}     />    
      {error && <span className="input-field__error">{error}</span>}
    </div>
  );
};

export default InputField;