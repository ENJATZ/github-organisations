import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'normal', ...rest }: IButton) => {
  return (
    <button
      {...rest}
      className={`p-2 bg-emerald-600 hover:bg-emerald-700 transition text-white font-regular rounded-md ${
        variant === 'secondary' && 'bg-zinc-300 hover:bg-zinc-400'
      } ${size === 'small' && 'p-1'}`}
    >
      {children}
    </button>
  );
};

interface IButton {
  children: JSX.Element;
  variant: 'primary' | 'secondary';
  size: 'small' | 'normal';
}
