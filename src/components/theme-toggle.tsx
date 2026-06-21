"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const themes = [
  {
    name: "light",
    label: "Light",
    icon: Sun,
    swatch: "hsl(0 0% 100%)",
  },
  {
    name: "dark",
    label: "Dark",
    icon: Moon,
    swatch: "hsl(222.2 84% 4.9%)",
  },
  {
    name: "pink",
    label: "Pink",
    icon: Palette,
    swatch: "hsl(346 77% 49%)",
  },
  {
    name: "blue",
    label: "Blue",
    icon: Palette,
    swatch: "hsl(221 83% 53%)",
  },
];

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    );
  }

  const currentTheme = themes.find((t) => t.name === theme);
  const CurrentIcon = currentTheme?.icon || Palette;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Toggle theme"
        >
          <CurrentIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="left"
        align="center"
        className="min-w-0 w-auto p-2"
      >
        <div className="flex items-center gap-2">
          {themes.map((themeOption) => {
            const isSelected = theme === themeOption.name;

            return (
              <DropdownMenuItem
                key={themeOption.name}
                onClick={() => handleThemeChange(themeOption.name)}
                className="theme-swatch"
                style={{ background: themeOption.swatch }}
                data-selected={isSelected}
                aria-label={`Switch to ${themeOption.label} theme`}
              >
                <span className="sr-only">{themeOption.label}</span>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
