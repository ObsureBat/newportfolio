import { create } from 'zustand';

interface AppState {
  scrollProgress: number;
  activeSection: number;
  mousePos: { x: number; y: number };
  isHoveringInteractive: boolean;
  hardwareTier: 'high' | 'low';
  isReducedMotion: boolean;
  
  cursorText: string | null;
  
  setScrollProgress: (progress: number) => void;
  setActiveSection: (index: number) => void;
  setMousePos: (x: number, y: number) => void;
  setIsHoveringInteractive: (hovering: boolean) => void;
  setCursorText: (text: string | null) => void;
  setHardwareTier: (tier: 'high' | 'low') => void;
  setIsReducedMotion: (reduced: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  scrollProgress: 0,
  activeSection: 0,
  mousePos: { x: 0, y: 0 },
  isHoveringInteractive: false,
  cursorText: null,
  hardwareTier: 'high',
  isReducedMotion: false,

  setScrollProgress: (progress) => set({ scrollProgress: Math.max(0, Math.min(1, progress)) }),
  setActiveSection: (index) => set({ activeSection: index }),
  setMousePos: (x, y) => set({ mousePos: { x, y } }),
  setIsHoveringInteractive: (hovering) => set({ isHoveringInteractive: hovering }),
  setCursorText: () => set({ cursorText: null }),
  setHardwareTier: (tier) => set({ hardwareTier: tier }),
  setIsReducedMotion: (reduced) => set({ isReducedMotion: reduced }),
}));
