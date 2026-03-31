import { useMemo } from 'react'

import { useBuilderStore } from '@/src/store/useBuilderStore'

export function useBuilderState() {
  const { slots, hasHydrated } = useBuilderStore()

  const selectedCount = useMemo(() => {
    return slots.filter(Boolean).length
  }, [slots])

  return {
    slots,
    hasHydrated,
    selectedCount,
    isEmpty: selectedCount === 0
  }
}
