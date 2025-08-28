import { useState, useMemo } from 'react'

export type SortDirection = 'asc' | 'desc' | null

interface SortConfig {
  key: string | null
  direction: SortDirection
}

interface UseSortProps<T> {
  data: T[]
  initialSort?: SortConfig
}

interface UseSortReturn<T> {
  sortedData: T[]
  sortConfig: SortConfig
  handleSort: (key: string) => void
  resetSort: () => void
}

export const useSort = <T>({
  data,
  initialSort = { key: null, direction: null }
}: UseSortProps<T>): UseSortReturn<T> => {
  const [sortConfig, setSortConfig] = useState<SortConfig>(initialSort)

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return data
    }

    return [...data].sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key!)
      const bValue = getNestedValue(b, sortConfig.key!)

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return sortConfig.direction === 'asc' ? 1 : -1
      if (bValue == null) return sortConfig.direction === 'asc' ? -1 : 1

      // Handle different data types
      let comparison = 0

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue, 'tr', { 
          numeric: true, 
          sensitivity: 'base' 
        })
      } else {
        // Convert to string for comparison
        comparison = String(aValue).localeCompare(String(bValue), 'tr', { 
          numeric: true, 
          sensitivity: 'base' 
        })
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison
    })
  }, [data, sortConfig])

  const handleSort = (key: string) => {
    setSortConfig(prevConfig => {
      if (prevConfig.key === key) {
        // Same key: cycle through asc -> desc -> null
        if (prevConfig.direction === 'asc') {
          return { key, direction: 'desc' }
        } else if (prevConfig.direction === 'desc') {
          return { key: null, direction: null }
        } else {
          return { key, direction: 'asc' }
        }
      } else {
        // New key: start with asc
        return { key, direction: 'asc' }
      }
    })
  }

  const resetSort = () => {
    setSortConfig({ key: null, direction: null })
  }

  return {
    sortedData,
    sortConfig,
    handleSort,
    resetSort
  }
}

// Helper function to get nested object values using dot notation
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => {
    return current?.[key]
  }, obj)
}