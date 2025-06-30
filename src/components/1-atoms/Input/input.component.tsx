// src/components/1-atoms/Input/input.component.tsx
import React from 'react';
import './input.component.scss';

// --- CHANGE 1: Add the optional 'hasError' prop to the interface ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input: React.FC<InputProps> = ({ hasError, ...props }) => {
  // --- CHANGE 2: Build a dynamic className ---
  // If hasError is true, the 'input-atom--error' class will be added.
  const className = `input-atom ${hasError ? 'input-atom--error' : ''}`;

  // --- CHANGE 3: Use the new className ---
  // We destructure `hasError` out so it doesn't get passed to the <input> element itself,
  // which would be invalid HTML.
  return <input className={className} {...props} />;
};

export default Input;