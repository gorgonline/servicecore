import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Button component — aligned with design-tokens.json
 *
 * Variants:  primary | secondary | ghost
 * Sizes:     sm | md (default) | lg
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base) disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-(--color-brand-primary) text-white rounded-full shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong) hover:bg-(--color-brand-primary-hover)",
        secondary:
          "bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 hover:border-white/15",
        ghost:
          "text-(--color-text-overline) hover:text-white rounded-lg",
        cta:
          "bg-white text-(--color-surface-base) rounded-full font-semibold hover:bg-slate-100 hover:scale-105 transition-all shadow-(--shadow-glow-white)",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }