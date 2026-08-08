"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  dictionaries,
  interpolate,
  type Dict,
  type Lang,
} from "@/lib/i18n/dictionaries";

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  dict: Dict;
};

const I18nContext = createContext<I18nContextValue | null>(null);
const STORAGE_KEY = "mms-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "en" || stored === "mr") setLangState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "mr" ? "mr" : "en";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    const dict = dictionaries[lang];
    return {
      lang,
      setLang,
      dict,
      t: (key, vars) => {
        const raw = dict[key] ?? dictionaries.en[key] ?? key;
        return vars ? interpolate(raw, vars) : raw;
      },
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
