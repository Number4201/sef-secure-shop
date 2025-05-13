
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const AspectRatio = AspectRatioPrimitive.Root;

/**
 * Enhanced AspectRatio component with security styling
 */
const SecureImageContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { ratio?: number }
>(({ className, ratio = 16 / 9, children, ...props }, ref) => {
  return (
    <div 
      className={cn("overflow-hidden rounded-md border border-esejfy-gray/10", className)} 
      ref={ref}
      {...props}
    >
      <AspectRatio ratio={ratio}>
        {children}
      </AspectRatio>
    </div>
  );
});

SecureImageContainer.displayName = "SecureImageContainer";

export { AspectRatio, SecureImageContainer };
