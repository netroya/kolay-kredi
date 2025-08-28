import React from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'

export type SortDirection = 'asc' | 'desc' | null

interface SortableHeaderProps {
  children: React.ReactNode
  sortKey: string
  currentSort: { key: string | null; direction: SortDirection }
  onSort: (key: string) => void
  className?: string
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  children,
  sortKey,
  currentSort,
  onSort,
  className = ''
}) => {
  const isActive = currentSort.key === sortKey
  const direction = isActive ? currentSort.direction : null

  const handleClick = () => {
    onSort(sortKey)
  }

  const getSortIcon = () => {
    if (!isActive || direction === null) {
      return <ChevronsUpDown className="w-4 h-4 text-gray-400" />
    }
    if (direction === 'asc') {
      return <ChevronUp className="w-4 h-4 text-blue-600" />
    }
    return <ChevronDown className="w-4 h-4 text-blue-600" />
  }

  return (
    <button
      onClick={handleClick}
      className={`
        flex items-center justify-between w-full px-6 py-3 text-left
        hover:bg-gray-50 transition-colors duration-150
        font-semibold text-gray-700 uppercase tracking-wider text-xs
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded
        ${isActive ? 'text-blue-600' : 'hover:text-gray-900'}
        ${className}
      `}
      aria-label={`Sırala: ${children} ${direction === 'asc' ? 'artan' : direction === 'desc' ? 'azalan' : ''}`}
      aria-pressed={isActive}
    >
      <span>{children}</span>
      {getSortIcon()}
    </button>
  )
}

export default SortableHeader