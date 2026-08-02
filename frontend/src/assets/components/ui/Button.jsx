// src/components/ui/Button.jsx
import React from 'react';

export default function Button({ children, variant = 'primary', className = '', isLoading, ...props }) {
  const baseStyles = 'inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]';

  const variants = {
    primary: 'bg-brand text-white shadow-sm shadow-brand/20 hover:bg-brand-dark focus:ring-brand/40',
    secondary: 'bg-slate-100 text-brand-dark border border-slate-300 hover:bg-brand/20 focus:ring-brand/40 shadow-sm hover:shadow-md',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300 shadow-sm',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}