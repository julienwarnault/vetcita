import { CSSProperties } from 'react'
import { cn } from 'tailwind-variants'

export type Column<T> = {
  id?: string
  header?: string
  accessor: keyof T | ((row: T) => React.ReactNode)
  style?: CSSProperties
  width: string | number
}

interface ListTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (row: T) => void
}

export function ListTable<T extends Record<string, any>>(props: ListTableProps<T>) {
  const { columns, data = [], onRowClick } = props

  const getCellValue = (row: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row)
    }

    return row[column.accessor] ?? '-'
  }

  if (data.length === 0) return null

  return (
    <div className="grow">
      <table className="relative w-full">
        <colgroup>
          {columns.map((column, i) => (
            <col key={i} style={{ width: column.width, ...column.style }} />
          ))}
        </colgroup>
        <thead className="border-b">
          <tr>
            {columns.map((column, i) => (
              <th key={i} className="px-2 py-4 first:pl-6 last:pr-6">
                <div className="flex items-center justify-start">
                  <div className="text-[15px]/5 font-semibold">{column.header}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            return (
              <tr
                key={i}
                className={cn('bg-white', !!onRowClick && 'border-b hover:bg-background cursor-pointer')}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column, j) => (
                  <td key={j} className="px-2 py-4 first:pl-6 last:pr-6">
                    <div className="text-[15px]/5">{getCellValue(row, column)}</div>
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
