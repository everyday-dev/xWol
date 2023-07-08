import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {isTooltipVisible && (
        <span
          style={{
            visibility: 'visible',
            backgroundColor: '#333',
            color: '#fff',
            textAlign: 'center',
            borderRadius: '6px',
            padding: '5px',
            position: 'absolute',
            zIndex: 1,
            bottom: '100%',
            left: '-50%',
            paddingLeft: '10px',
            paddingRight: '10px',
            marginLeft: '0',
            opacity: 1,
            transition: 'opacity 0.3s',
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default Tooltip;