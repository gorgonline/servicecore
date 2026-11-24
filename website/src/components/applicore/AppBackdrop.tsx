export default function AppBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-240 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-150 w-240 -translate-x-1/2 rounded-full bg-(--color-brand-primary)/20 blur-[140px]" />
      <div className="absolute top-96 right-0 h-100 w-120 rounded-full bg-(--color-brand-accent)/10 blur-[120px]" />
    </div>
  );
}
