// src/components/1-atoms/Logo/logo.component.tsx
import React from 'react';
import './logo.component.scss';

// ======================================================================
// 1. YOUR NEW, MORE DETAILED PragmaLogo SVG COMPONENT
// ======================================================================

interface PragmaLogoProps {
  showText?: boolean;
}

const PragmaLogo: React.FC<PragmaLogoProps> = ({ showText = true }) => (
  <svg
    className="logo-svg"
    viewBox={showText ? '0 0 158 184' : '0 0 158 110'}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Pragma Logo"
  >
    <g id="icon-group">
      <circle cx="79" cy="55" r="53.5" stroke="currentColor" strokeWidth="3" />
      <circle cx="79" cy="55" r="37.5" stroke="currentColor" strokeWidth="3" />
      <g transform="translate(79, 55)">
        <line y1="-37.5" y2="-53.5" stroke="currentColor" strokeWidth="3" />
        <line
          y1="-37.5"
          y2="-53.5"
          stroke="currentColor"
          strokeWidth="3"
          transform="rotate(45)"
        />
        <line
          y1="-37.5"
          y2="-53.5"
          stroke="currentColor"
          strokeWidth="3"
          transform="rotate(90)"
        />
        <line
          y1="-37.5"
          y2="-53.5"
          stroke="currentColor"
          strokeWidth="3"
          transform="rotate(135)"
        />
        <line
          y1="-37.5"
          y2="-53.5"
          stroke="currentColor"
          strokeWidth="3"
          transform="rotate(180)"
        />
        <line
          y1="-37.5"
          y2="-53.5"
          stroke="currentColor"
          strokeWidth="3"
          transform="rotate(225)"
        />
        <line
          y1="-37.5"
          y2="-53.5"
          stroke="currentColor"
          strokeWidth="3"
          transform="rotate(270)"
        />
        <line
          y1="-37.5"
          y2="-53.5"
          stroke="currentColor"
          strokeWidth="3"
          transform="rotate(315)"
        />
      </g>
      <path
        d="M82.1667 46.1667C82.1667 48.4578 80.7911 50.3333 79 50.3333C77.2089 50.3333 75.8333 48.4578 75.8333 46.1667C75.8333 43.8756 77.2089 42 79 42C80.7911 42 82.1667 43.8756 82.1667 46.1667Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M85.5 64.5C85.5 67.8137 82.5939 70.5 79 70.5C75.4061 70.5 72.5 67.8137 72.5 64.5C72.5 61.1863 75.4061 58.5 79 58.5C82.5939 58.5 85.5 61.1863 85.5 64.5Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M73 48C70.6667 52.6667 70.6 61.2 73.5 64.5"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
    </g>

    {/* ----- Conditionally render the text image ----- */}
    {showText && (
      // --- THE FIX IS HERE ---
      // Replaced the external URL with a self-contained Data URL to ensure it always renders.
      <image
        href="data:image/png;base64,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"
        x="2.5"
        y="125"
        width="153"
        height="46"
      />
      // --- END OF FIX ---
    )}
  </svg>
);

// ======================================================================
// 2. THE MAIN Logo COMPONENT (The "Wrapper")
// ======================================================================
interface LogoProps {
  size?: 'small' | 'large';
  text?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'large', text }) => {
  const showText = !!text;

  return (
    <div className={`logo-container ${size}`}>
      <PragmaLogo showText={showText} />
    </div>
  );
};

export default Logo;