import { useState, useEffect } from "react";

interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: number;
  reduceMotion: boolean;
}

export const useAccessibility = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // Carregar preferências salvas do localStorage
    const saved = localStorage.getItem("accessibility-settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { highContrast: false, fontSize: 100, reduceMotion: false };
      }
    }

    // Detectar preferências do sistema
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const prefersHighContrast = window.matchMedia(
      "(prefers-contrast: high)",
    ).matches;

    return {
      highContrast: prefersHighContrast,
      fontSize: 100,
      reduceMotion: prefersReducedMotion,
    };
  });

  // Aplicar configurações ao documento
  useEffect(() => {
    const root = document.documentElement;

    // Alto contraste
    if (settings.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    // Tamanho da fonte
    root.style.fontSize = `${settings.fontSize}%`;

    // Reduzir movimento
    if (settings.reduceMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }

    // Salvar preferências
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
  }, [settings]);

  const toggleHighContrast = () => {
    setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const increaseFontSize = () => {
    setSettings((prev) => ({
      ...prev,
      fontSize: Math.min(prev.fontSize + 10, 150),
    }));
  };

  const decreaseFontSize = () => {
    setSettings((prev) => ({
      ...prev,
      fontSize: Math.max(prev.fontSize - 10, 80),
    }));
  };

  const resetFontSize = () => {
    setSettings((prev) => ({ ...prev, fontSize: 100 }));
  };

  const toggleReduceMotion = () => {
    setSettings((prev) => ({ ...prev, reduceMotion: !prev.reduceMotion }));
  };

  const resetSettings = () => {
    setSettings({ highContrast: false, fontSize: 100, reduceMotion: false });
  };

  return {
    settings,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleReduceMotion,
    resetSettings,
  };
};

// Hook para detecção de preferências de acessibilidade do sistema
export const useSystemAccessibilityPreferences = () => {
  const [preferences, setPreferences] = useState({
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches,
    highContrast: window.matchMedia("(prefers-contrast: high)").matches,
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  });

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const highContrastQuery = window.matchMedia("(prefers-contrast: high)");
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updatePreferences = () => {
      setPreferences({
        reducedMotion: reducedMotionQuery.matches,
        highContrast: highContrastQuery.matches,
        darkMode: darkModeQuery.matches,
      });
    };

    reducedMotionQuery.addEventListener("change", updatePreferences);
    highContrastQuery.addEventListener("change", updatePreferences);
    darkModeQuery.addEventListener("change", updatePreferences);

    return () => {
      reducedMotionQuery.removeEventListener("change", updatePreferences);
      highContrastQuery.removeEventListener("change", updatePreferences);
      darkModeQuery.removeEventListener("change", updatePreferences);
    };
  }, []);

  return preferences;
};
