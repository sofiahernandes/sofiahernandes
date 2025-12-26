"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { type CustomTheme, defaultCustomTheme, ThemeManager } from "@/lib/theme-manager"
import { Download, Eye, Palette, Save, Trash2, Upload } from "lucide-react"
import { useTheme } from "next-themes"
import { useCallback, useEffect, useState } from "react"
import { ColorPicker } from "./color-picker"

interface ThemeCustomizerProps {
  children: React.ReactNode
}

export function ThemeCustomizer({ children }: ThemeCustomizerProps) {
  const { setTheme, theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>([])
  const [currentTheme, setCurrentTheme] = useState(defaultCustomTheme)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [originalTheme, setOriginalTheme] = useState<string | null>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  useEffect(() => {
    setCustomThemes(ThemeManager.getCustomThemes())
  }, [])

  // Store original theme when opening customizer
  useEffect(() => {
    if (isOpen && !originalTheme) {
      setOriginalTheme(theme || "light")
    }
  }, [isOpen, theme, originalTheme])

  const colorCategories = [
    {
      name: "Background",
      colors: [
        { key: "background", label: "Background", description: "Main background color" },
        { key: "foreground", label: "Foreground", description: "Main text color" },
        { key: "card", label: "Card", description: "Card background" },
        { key: "cardForeground", label: "Card Text", description: "Text on cards" },
      ],
    },
    {
      name: "Interactive",
      colors: [
        { key: "primary", label: "Primary", description: "Primary buttons and links" },
        { key: "primaryForeground", label: "Primary Text", description: "Text on primary elements" },
        { key: "secondary", label: "Secondary", description: "Secondary elements" },
        { key: "secondaryForeground", label: "Secondary Text", description: "Text on secondary elements" },
      ],
    },
    {
      name: "Accents",
      colors: [
        { key: "accent", label: "Accent", description: "Accent elements" },
        { key: "accentForeground", label: "Accent Text", description: "Text on accent elements" },
        { key: "muted", label: "Muted", description: "Muted backgrounds" },
        { key: "mutedForeground", label: "Muted Text", description: "Muted text" },
      ],
    },
    {
      name: "System",
      colors: [
        { key: "border", label: "Border", description: "Border color" },
        { key: "input", label: "Input", description: "Input backgrounds" },
        { key: "ring", label: "Focus Ring", description: "Focus indicators" },
        { key: "destructive", label: "Destructive", description: "Error/danger color" },
        { key: "destructiveForeground", label: "Destructive Text", description: "Text on error elements" },
      ],
    },
  ]

  // Real-time preview function
  const previewTheme = useCallback((themeToPreview: typeof currentTheme) => {
    ThemeManager.previewTheme(themeToPreview)
    setIsPreviewMode(true)
  }, [])

  const handleColorChange = (key: keyof typeof currentTheme.colors, value: string) => {
    const updatedTheme = {
      ...currentTheme,
      colors: {
        ...currentTheme.colors,
        [key]: value,
      },
    }
    setCurrentTheme(updatedTheme)

    // Apply real-time preview
    previewTheme(updatedTheme)
  }

  const handleSaveTheme = async () => {
    try {
      if (isEditing) {
        const updated = ThemeManager.updateCustomTheme(isEditing, currentTheme)
        if (updated) {
          setCustomThemes(ThemeManager.getCustomThemes())
          ThemeManager.applyCustomTheme(updated)
          setTheme("custom")
          toast({
            title: "Theme Updated",
            description: `"${currentTheme.name}" has been updated and applied successfully.`,
          })
        }
      } else {
        const saved = ThemeManager.saveCustomTheme(currentTheme)
        setCustomThemes(ThemeManager.getCustomThemes())
        ThemeManager.applyCustomTheme(saved)
        setTheme("custom")
        toast({
          title: "Theme Saved & Applied",
          description: `"${saved.name}" has been saved and applied successfully.`,
        })
      }
      setIsEditing(null)
      setIsPreviewMode(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save theme",
        variant: "destructive",
      })
    }
  }

  const handleApplyTheme = (themeToApply: CustomTheme) => {
    ThemeManager.applyCustomTheme(themeToApply)
    setTheme("custom")
    setIsPreviewMode(false)
    toast({
      title: "Theme Applied",
      description: `"${themeToApply.name}" is now active.`,
    })
  }

  const handlePreviewTheme = (themeToPreview: CustomTheme) => {
    setCurrentTheme({
      name: themeToPreview.name,
      colors: themeToPreview.colors,
    })
    previewTheme(themeToPreview)
    toast({
      title: "Theme Preview",
      description: `Previewing "${themeToPreview.name}". Save to make it permanent.`,
    })
  }

  const handleDeleteTheme = (id: string, name: string) => {
    if (ThemeManager.deleteCustomTheme(id)) {
      setCustomThemes(ThemeManager.getCustomThemes())
      toast({
        title: "Theme Deleted",
        description: `"${name}" has been deleted.`,
      })
    }
  }

  const handleEditTheme = (themeToEdit: CustomTheme) => {
    setCurrentTheme({
      name: themeToEdit.name,
      colors: themeToEdit.colors,
    })
    setIsEditing(themeToEdit.id)
    previewTheme(themeToEdit)
  }

  const handleExportTheme = (themeToExport: CustomTheme) => {
    const dataStr = JSON.stringify(themeToExport, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${themeToExport.name.replace(/\s+/g, "-").toLowerCase()}-theme.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImportTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string)
        if (imported.colors && imported.name) {
          const importedTheme = {
            name: `${imported.name} (Imported)`,
            colors: imported.colors,
          }
          setCurrentTheme(importedTheme)
          previewTheme(importedTheme)
          toast({
            title: "Theme Imported",
            description: "Theme has been loaded and previewed. You can now customize and save it.",
          })
        }
      } catch {
        toast({
          title: "Import Error",
          description: "Invalid theme file format.",
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
    event.target.value = ""
  }

  const resetToDefault = () => {
    setCurrentTheme(defaultCustomTheme)
    setIsEditing(null)
    previewTheme(defaultCustomTheme)
  }

  const handleClose = () => {
    // Restore original theme if in preview mode and not saved
    if (isPreviewMode && originalTheme) {
      if (originalTheme === "custom") {
        const currentCustom = ThemeManager.getCurrentCustomTheme()
        if (currentCustom) {
          ThemeManager.applyCustomTheme(currentCustom)
        }
      } else {
        ThemeManager.removeCustomTheme()
        setTheme(originalTheme)
      }
    }

    setIsOpen(false)
    setIsPreviewMode(false)
    setOriginalTheme(null)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleClose()
        } else {
          setIsOpen(true)
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Customizer
            {isPreviewMode && (
              <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">Preview Mode</span>
            )}
          </DialogTitle>
          <DialogDescription>
            Create and manage your custom color schemes. Changes are previewed in real-time.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="create" className="flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Theme</TabsTrigger>
            <TabsTrigger value="manage">Manage Themes</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="theme-name">Theme Name</Label>
                <Input
                  id="theme-name"
                  value={currentTheme.name}
                  onChange={(e) => setCurrentTheme((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="My Custom Theme"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetToDefault}>
                  Reset
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="import-theme" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </label>
                </Button>
                <input id="import-theme" type="file" accept=".json" onChange={handleImportTheme} className="hidden" />
              </div>
            </div>

            <ScrollArea className="h-96">
              <div className="space-y-6 pr-4">
                {colorCategories.map((category) => (
                  <div key={category.name}>
                    <h3 className="font-semibold text-lg mb-3">{category.name}</h3>
                    <div className="grid gap-4 lg:grid-cols-2">
                      {category.colors.map((color) => (
                        <ColorPicker
                          key={color.key}
                          label={color.label}
                          value={currentTheme.colors[color.key as keyof typeof currentTheme.colors]}
                          onChange={(value) => handleColorChange(color.key as keyof typeof currentTheme.colors, value)}
                          description={color.description}
                        />
                      ))}
                    </div>
                    {category !== colorCategories[colorCategories.length - 1] && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="manage" className="space-y-4">
            <ScrollArea className="h-96">
              <div className="space-y-4 pr-4">
                {customThemes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Palette className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No custom themes yet.</p>
                    <p className="text-sm">Create your first theme in the "Create Theme" tab.</p>
                  </div>
                ) : (
                  customThemes.map((themeItem) => (
                    <div key={themeItem.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{themeItem.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Created {new Date(themeItem.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handlePreviewTheme(themeItem)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleApplyTheme(themeItem)}>
                            Apply
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditTheme(themeItem)}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleExportTheme(themeItem)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteTheme(themeItem.id, themeItem.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {Object.entries(themeItem.colors)
                          .slice(0, 8)
                          .map(([key, color]) => (
                            <div
                              key={key}
                              className="w-6 h-6 rounded border"
                              style={{ backgroundColor: color }}
                              title={key}
                            />
                          ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {isPreviewMode ? "Cancel" : "Close"}
          </Button>
          <Button onClick={handleSaveTheme}>
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? "Update & Apply Theme" : "Save & Apply Theme"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
