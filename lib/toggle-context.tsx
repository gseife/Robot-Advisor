"use client";
import { createContext, useContext, useState } from "react";
import type { ToggleState } from "./types";
import { ALL_BIASED } from "./types";

type Ctx = {
  toggles: ToggleState;
  setToggle: (k: keyof ToggleState, v: boolean) => void;
  reset: () => void;
};

const ToggleContext = createContext<Ctx | null>(null);

export function ToggleProvider({ children }: { children: React.ReactNode }) {
  const [toggles, setToggles] = useState<ToggleState>(ALL_BIASED);
  const setToggle = (k: keyof ToggleState, v: boolean) =>
    setToggles((prev) => ({ ...prev, [k]: v }));
  const reset = () => setToggles(ALL_BIASED);
  return (
    <ToggleContext.Provider value={{ toggles, setToggle, reset }}>
      {children}
    </ToggleContext.Provider>
  );
}

export function useToggles() {
  const ctx = useContext(ToggleContext);
  if (!ctx) throw new Error("useToggles outside ToggleProvider");
  return ctx;
}
