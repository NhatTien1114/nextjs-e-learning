import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "py-3 flex outline-none h-40 rounded-md font-medium px-3 w-full text-sm border border-gray-200 focus:!border-primary transition-all dark:border/10 bg-white dark:bg-grayDarker",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
