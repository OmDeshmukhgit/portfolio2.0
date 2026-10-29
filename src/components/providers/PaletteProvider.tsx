'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ArchivePalette = 'twilight' | 'classic';

interface PaletteContextType {
  palette: ArchivePalette;
  isTwilight: boolean;
  setPalette: (palette: ArchivePalette) => void;
  togglePalette: () => void;
}

const PaletteContext = createContext<PaletteContextType>({
  palette: 'twilight',
  isTwilight: true,
  setPalette: () => {},
  togglePalette: () => {},
});

const STORAGE_KEY = 'om_archive_palette_preference';

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = useState<ArchivePalette>('twilight');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check localStorage preference or default to 'twilight'
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ArchivePalette | null;
      if (saved === 'classic' || saved === 'twilight') {
        setPaletteState(saved);
        document.documentElement.setAttribute('data-palette', saved);
      } else {
        document.documentElement.setAttribute('data-palette', 'twilight');
      }
    } catch {
      document.documentElement.setAttribute('data-palette', 'twilight');
    }
    setMounted(true);
  }, []);

  const setPalette = (newPalette: ArchivePalette) => {
    setPaletteState(newPalette);
    try {
      localStorage.setItem(STORAGE_KEY, newPalette);
    } catch {
      // ignore in restricted environments
    }
    document.documentElement.setAttribute('data-palette', newPalette);
  };

  const togglePalette = () => {
    const next = palette === 'twilight' ? 'classic' : 'twilight';
    setPalette(next);
  };

  return (
    <PaletteContext.Provider
      value={{
        palette,
        isTwilight: palette === 'twilight',
        setPalette,
        togglePalette,
      }}
    >
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  return useContext(PaletteContext);
}
