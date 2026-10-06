import React from "react";
import { cn } from "../../utils/cn";

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  narrow?: boolean;
  as?: React.ElementType;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  narrow = false,
  as: Component = "div",
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        "w-full mx-auto px-4 sm:px-8",
        narrow ? "max-w-[860px]" : "max-w-[1200px]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default PageContainer;
