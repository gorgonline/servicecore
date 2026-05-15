import * as React from "react";

interface EnProps {
  children: React.ReactNode;
  className?: string;
}

const En = ({ children, className }: EnProps) => (
  <span lang="en" className={className}>
    {children}
  </span>
);

export { En };
