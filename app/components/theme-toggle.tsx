"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, Monitor, Moon, Palette, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { type CustomTheme, ThemeManager } from "@/lib/theme-manager"

const themes = [
  {
    name: "system",
    label: "System",
    icon: Monitor,
    description: "Follow system preference",
  },
  {
    name: "light",
    label: "Light",
    icon: Sun,
    description: "Clean and bright",
  },
  {
    name: "dark",
    label: "Dark",
    icon: Moon,
    description: "Easy on the eyes",
  },
  {
    name: "pink",
    label: "Pink",
    icon: Palette,
    description: "Soft and elegant",
  },
  {
    name: "blue",
    label: "Blue",
    icon: Palette,
    description: "Cool and professional",
  },
]

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>([])

  useEffect(() => {
    setMounted(true)
  }, [theme])

  useEffect(() => {
    // Listen for custom theme changes
    const handleStorageChange = () => {
      setCustomThemes(ThemeManager.getCustomThemes())
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const handleThemeChange = (themeName: string) => {
    ThemeManager.removeCustomTheme()
    setTheme(themeName)
    // Ensure the theme is properly restored
    setTimeout(() => {
      ThemeManager.restoreTheme(themeName)
    }, 50)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    )
  }

  const currentTheme = themes.find((t) => t.name === theme)
  const CurrentIcon = currentTheme?.icon || Palette

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Toggle theme">
          <CurrentIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          const isSelected = theme === themeOption.name

          return (
            <DropdownMenuItem
              key={themeOption.name}
              onClick={() => handleThemeChange(themeOption.name)}
              className="flex items-center justify-between cursor-pointer"
              aria-label={`Switch to ${themeOption.label} theme`}
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{themeOption.label}</span>
                  <span className="text-xs text-muted-foreground">{themeOption.description}</span>
                </div>
              </div>
              {isSelected && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
