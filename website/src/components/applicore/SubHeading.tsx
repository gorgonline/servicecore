interface SubHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SubHeading({ children, className = "" }: SubHeadingProps) {
  return (
    <h3 className={`text-xl font-semibold tracking-tight text-white md:text-2xl ${className}`}>
      {children}
    </h3>
  );
}
