import { useEffect, useState } from "react"

type Theme = "light" | "dark"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("app-theme") as Theme | null
    if (savedTheme) return savedTheme

    // Fallback: If it's a first-time user, inspect their System UI settings
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    return systemPrefersDark ? "dark" : "light"
  })

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-theme", theme)
    localStorage.setItem("app-theme", theme)
  }, [theme])

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "🌙 Go Dark" : "☀️ Go Light"}
    </button>
  )
}
