import { cn } from "@/lib/utils";

interface FeatureBadgeProps {
  children: React.ReactNode;
  className?: string;
}

const FeatureBadge = ({ children, className }: FeatureBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium",
        "bg-secondary text-secondary-foreground border border-border",
        className
      )}
    >
      {children}
    </span>
  );
};

export default FeatureBadge;
