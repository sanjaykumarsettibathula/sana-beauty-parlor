"use client"

import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-full p-2 sm:p-4", className)}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-full", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 w-full", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center justify-between w-full absolute inset-x-0 top-0 px-2 z-10",
          defaultClassNames.nav
        ),
        button_previous: cn(
          "h-9 w-9 p-0 rounded-xl border border-border bg-card/80 hover:bg-primary/20 text-muted-foreground hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-sm",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          "h-9 w-9 p-0 rounded-xl border border-border bg-card/80 hover:bg-primary/20 text-muted-foreground hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-sm",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-9 w-full items-center justify-center relative",
          defaultClassNames.month_caption
        ),
        caption_label: cn(
          "text-base sm:text-lg font-bold text-white tracking-wide select-none",
          defaultClassNames.caption_label
        ),
        month_grid: cn("w-full border-collapse table-fixed mt-4", defaultClassNames.month_grid),
        weekdays: cn("w-full", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground text-xs sm:text-sm font-semibold uppercase tracking-wider py-2 text-center select-none w-[14.28%]",
          defaultClassNames.weekday
        ),
        weeks: cn("w-full", defaultClassNames.weeks),
        week: cn("w-full", defaultClassNames.week),
        day: cn("p-1 sm:p-1.5 text-center align-middle relative w-[14.28%]", defaultClassNames.day),
        day_button: cn(
          "w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-xl flex items-center justify-center text-sm sm:text-base font-semibold transition-all cursor-pointer select-none text-white/90 hover:bg-primary/20 hover:text-white",
          defaultClassNames.day_button
        ),
        selected: cn(
          "[&>.rdp-day_button]:bg-primary [&>.rdp-day_button]:text-white [&>.rdp-day_button]:font-bold [&>.rdp-day_button]:shadow-[0_0_20px_rgba(255,79,139,0.7)] [&>.rdp-day_button]:scale-105",
          defaultClassNames.selected
        ),
        today: cn(
          "[&>.rdp-day_button]:border-2 [&>.rdp-day_button]:border-primary/80 [&>.rdp-day_button]:text-primary font-bold",
          defaultClassNames.today
        ),
        disabled: cn(
          "opacity-30 cursor-not-allowed [&>.rdp-day_button]:cursor-not-allowed [&>.rdp-day_button]:hover:bg-transparent [&>.rdp-day_button]:line-through text-muted-foreground",
          defaultClassNames.disabled
        ),
        outside: cn(
          "opacity-20 pointer-events-none text-muted-foreground",
          defaultClassNames.outside
        ),
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }
          return (
            <ChevronRightIcon className={cn("size-4", className)} {...props} />
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

export { Calendar }
