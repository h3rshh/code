import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`px-6 py-1 rounded-md border bg-black-500 text-white hover:bg-blue-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
