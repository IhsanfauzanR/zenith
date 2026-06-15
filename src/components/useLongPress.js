import { useRef, useState, useCallback } from 'react';

// Long-press hook yang bekerja untuk touch DAN mouse-hold.
// Threshold default 550ms.
// Mengembalikan handlers + `isPressing` untuk feedback visual.
export default function useLongPress(handler, options) {
  const ms = options?.ms ?? 550;
  const timerRef = useRef(null);
  const triggeredRef = useRef(false);
  const [isPressing, setIsPressing] = useState(false);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPressing(false);
  }, []);

  const start = useCallback((e) => {
    triggeredRef.current = false;
    setIsPressing(true);
    timerRef.current = setTimeout(() => {
      triggeredRef.current = true;
      setIsPressing(false);
      handler?.(e);
    }, ms);
  }, [handler, ms]);

  const cancel = useCallback(() => {
    clear();
  }, [clear]);

  // Click handler: kalau long-press sudah trigger, blokir click berikutnya
  // supaya tap-navigate tak ikut jalan setelah delete confirm.
  const onClickCapture = useCallback((e) => {
    if (triggeredRef.current) {
      e.stopPropagation();
      e.preventDefault();
      triggeredRef.current = false;
    }
  }, []);

  return {
    isPressing,
    handlers: {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
      onTouchStart: start,
      onTouchEnd: cancel,
      onTouchCancel: cancel,
      onContextMenu: (e) => e.preventDefault(),
      onClickCapture,
    },
  };
}
