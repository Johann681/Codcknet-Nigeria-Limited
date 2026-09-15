"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("codcknet-theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const nextLight = saved ? saved === "light" : prefersLight;
    document.documentElement.dataset.theme = nextLight ? "light" : "dark";
    setLight(nextLight);
  }, []);

  function toggleTheme() {
    const nextLight = !light;
    document.documentElement.dataset.theme = nextLight ? "light" : "dark";
    window.localStorage.setItem("codcknet-theme", nextLight ? "light" : "dark");
    setLight(nextLight);
  }

  return <button className="theme-toggle" onClick={toggleTheme} aria-label={light ? "Switch to dark mode" : "Switch to light mode"} title={light ? "Switch to dark mode" : "Switch to light mode"}>{light ? <Moon size={16} /> : <Sun size={16} />}</button>;
}
