import { useRef } from 'react';

// Hook untuk deteksi double-tap pada elemen apa pun.
// Pakai onClick (bukan ondblclick) agar konsisten di mobile + desktop.
// Window deteksi: 400ms antar tap.
export default function useDoubleTap(handler, options) {
  const win = options?.window ?? 600;
  // Pakai object container agar selalu sama instance & mutasi langsung
  const state = useRef({ lastTap: 0, handler });
  state.current.handler = handler;

  // Return stable handler tiap render — pakai ref untuk handler lookup
  const stableRef = useRef(null);
  if (!stableRef.current) {
    stableRef.current = (e) => {
      const now = Date.now();
      const delta = now - state.current.lastTap;
      if (state.current.lastTap !== 0 && delta < win) {
        state.current.lastTap = 0;
        state.current.handler?.(e);
      } else {
        state.current.lastTap = now;
      }
    };
  }
  return stableRef.current;
}
