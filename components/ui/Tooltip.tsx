'use client';

import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: 'right' | 'top' | 'bottom' | 'left';
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'right',
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  if (disabled || !content) {
    return <>{children}</>;
  }

  const positionStyles = {
    right: 'left-full ml-2.5 top-1/2 -translate-y-1/2',
    left: 'right-full mr-2.5 top-1/2 -translate-y-1/2',
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-slate-900 dark:bg-slate-800 rounded-md shadow-lg pointer-events-none whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-150 border border-slate-700/50 ${positionStyles[side]}`}
        >
          {content}
          <div
            className={`absolute w-1.5 h-1.5 bg-slate-900 dark:bg-slate-800 rotate-45 border-slate-700/50 ${
              side === 'right'
                ? '-left-1 top-1/2 -translate-y-1/2 border-l border-b'
                : side === 'left'
                ? '-right-1 top-1/2 -translate-y-1/2 border-r border-t'
                : side === 'top'
                ? '-bottom-1 left-1/2 -translate-x-1/2 border-r border-b'
                : '-top-1 left-1/2 -translate-x-1/2 border-l border-t'
            }`}
          />
        </div>
      )}
    </div>
  );
};
