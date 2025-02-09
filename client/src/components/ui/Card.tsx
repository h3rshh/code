import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties; // <-- Add this line
}

export function Card({ children, className = "", style }: CardProps) {
  return (
    <div className={`rounded-lg bg-gray-900 p-4 text-white shadow-md ${className}`} style={style}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}
