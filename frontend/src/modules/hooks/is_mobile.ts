import { useMemo } from 'react'

export function useIsMobileDevice() {
  return useMemo(() => {
    return !!('ontouchstart' in window || 'onmsgesturechange' in window)
  }, [])
}
