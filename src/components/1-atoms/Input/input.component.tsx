// src/components/1-atoms/Input/input.component.tsx
import React from 'react';
import './input.component.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ ...props }) => {
  return <input className="custom-input" {...props} />;
};

export default Input;