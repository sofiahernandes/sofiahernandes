export interface CustomTheme {
  id: string
  name: string
  colors: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    ring: string
  }
  createdAt: string
  updatedAt: string
}

export const defaultCustomTheme: Omit<CustomTheme, "id" | "createdAt" | "updatedAt"> = {
  name: "My Custom Theme",
  colors: {
    background: "#ffffff",
    foreground: "#0f172a",
    card: "#ffffff",
    cardForeground: "#0f172a",
    popover: "#ffffff",
    popoverForeground: "#0f172a",
    primary: "#0f172a",
    primaryForeground: "#f8fafc",
    secondary: "#f1f5f9",
    secondaryForeground: "#0f172a",
    muted: "#f1f5f9",
    mutedForeground: "#64748b",
    accent: "#f1f5f9",
    accentForeground: "#0f172a",
    destructive: "#ef4444",
    destructiveForeground: "#f8fafc",
    border: "#e2e8f0",
    input: "#ffffff",
    ring: "#0f172a",
  },
}

export class ThemeManager {
  private static readonly STORAGE_KEY = "custom-themes"
  private static readonly CURRENT_CUSTOM_KEY = "current-custom-theme"

  static getCustomThemes(): CustomTheme[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  static saveCustomTheme(theme: Omit<CustomTheme, "id" | "createdAt" | "updatedAt">): CustomTheme {
    const customTheme: CustomTheme = {
      ...theme,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const themes = this.getCustomThemes()
    themes.push(customTheme)

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(themes))
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent("customThemeUpdate"))
    } catch (error) {
      console.error("Failed to save custom theme:", error)
      throw new Error("Failed to save theme. Storage might be full.")
    }

    return customTheme
  }

  static updateCustomTheme(id: string, updates: Partial<Omit<CustomTheme, "id" | "createdAt">>): CustomTheme | null {
    const themes = this.getCustomThemes()
    const themeIndex = themes.findIndex((t) => t.id === id)

    if (themeIndex === -1) return null

    themes[themeIndex] = {
      ...themes[themeIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(themes))
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent("customThemeUpdate"))
    } catch (error) {
      console.error("Failed to update custom theme:", error)
      throw new Error("Failed to update theme.")
    }

    return themes[themeIndex]
  }

  static deleteCustomTheme(id: string): boolean {
    const themes = this.getCustomThemes()
    const filteredThemes = themes.filter((t) => t.id !== id)

    if (filteredThemes.length === themes.length) return false

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredThemes))
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent("customThemeUpdate"))
      return true
    } catch (error) {
      console.error("Failed to delete custom theme:", error)
      return false
    }
  }

  static applyCustomTheme(theme: CustomTheme | Omit<CustomTheme, "id" | "createdAt" | "updatedAt">) {
    if (typeof document === "undefined") return

    const root = document.documentElement

    // Remove all existing theme classes
    root.classList.remove("light", "dark", "pink", "blue")

    // Add custom theme class
    root.classList.add("custom-theme")

    // Apply CSS variables with !important to ensure they override everything
    Object.entries(theme.colors).forEach(([key, value]) => {
      const hsl = this.hexToHsl(value)
      const cssVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase()
      root.style.setProperty(`--${cssVarName}`, hsl, "important")
    })

    // Store current custom theme for persistence
    try {
      localStorage.setItem(this.CURRENT_CUSTOM_KEY, JSON.stringify(theme))
    } catch (error) {
      console.error("Failed to store current custom theme:", error)
    }

    // Force a repaint to ensure changes are applied
    root.style.display = "none"
    root.offsetHeight // Trigger reflow
    root.style.display = ""
  }

  static getCurrentCustomTheme(): CustomTheme | null {
    if (typeof window === "undefined") return null

    try {
      const stored = localStorage.getItem(this.CURRENT_CUSTOM_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  }

  static removeCustomTheme() {
    if (typeof document === "undefined") return

    const root = document.documentElement

    // Remove custom theme class
    root.classList.remove("custom-theme")

    // Remove all custom CSS variables
    Object.keys(defaultCustomTheme.colors).forEach((key) => {
      const cssVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase()
      root.style.removeProperty(`--${cssVarName}`)
    })

    // Clear current custom theme
    try {
      localStorage.removeItem(this.CURRENT_CUSTOM_KEY)
    } catch (error) {
      console.error("Failed to clear current custom theme:", error)
    }
  }

  static previewTheme(theme: Omit<CustomTheme, "id" | "createdAt" | "updatedAt">) {
    // Apply theme without saving to localStorage
    if (typeof document === "undefined") return

    const root = document.documentElement

    // Remove all existing theme classes
    root.classList.remove("light", "dark", "pink", "blue")

    // Add custom theme class
    root.classList.add("custom-theme")

    // Apply CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      const hsl = this.hexToHsl(value)
      const cssVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase()
      root.style.setProperty(`--${cssVarName}`, hsl, "important")
    })

    // Force a repaint
    root.style.display = "none"
    root.offsetHeight // Trigger reflow
    root.style.display = ""
  }

  static restoreTheme(themeName: string) {
    if (typeof document === "undefined") return

    const root = document.documentElement

    if (themeName === "custom") {
      const currentCustom = this.getCurrentCustomTheme()
      if (currentCustom) {
        this.applyCustomTheme(currentCustom)
      }
    } else {
      // Remove custom theme
      this.removeCustomTheme()

      // Remove all theme classes first
      root.classList.remove("light", "dark", "pink", "blue", "custom-theme")

      // Add the correct theme class
      if (themeName !== "system") {
        root.classList.add(themeName)
      }
    }
  }

  private static hexToHsl(hex: string): string {
    // Remove # if present
    hex = hex.replace("#", "")

    // Handle 3-character hex codes
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("")
    }

    // Convert to RGB
    const r = Number.parseInt(hex.substr(0, 2), 16) / 255
    const g = Number.parseInt(hex.substr(2, 2), 16) / 255
    const b = Number.parseInt(hex.substr(4, 2), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
  }
}
