import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex outline-none h-10 rounded-md font-medium px-3 w-full text-sm border border-gray-200 focus:!border-primary transition-all bg-white dark:bg-grayDarker borderDarkMode disabled:bg-gray-100 dark:disabled:bg-grayDarkest disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

export { Input }
