// src/components/1-atoms/Button/button.component.tsx
import React from 'react';
import './button.component.scss';

// Add a 'variant' prop to the interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'outline'; // 'solid' is the default, 'outline' is the new one
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid', // Set 'solid' as the default variant
  ...props
}) => {
  // Conditionally build the className string
  const buttonClassName = `custom-button custom-button--${variant}`;

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
