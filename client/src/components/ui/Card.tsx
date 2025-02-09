import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties; // <-- Add this line
}

export function Card({ children, className = "", style }: CardProps) {
  return (
    <div className={`rounded-lg bg-[#434358] border-2 border-white p-4 text-white shadow-md flex flex-col item-start transition ${className}`} style={style}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`p-2 flex flex-col top-0 bottom-0 ${className}`}>{children}</div>;
}
