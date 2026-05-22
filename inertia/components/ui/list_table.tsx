import { CSSProperties } from 'react'
import { cn } from 'tailwind-variants'
import { router } from '@inertiajs/react'
import useSearchParams from '~/hooks/use_search_params'
import { SearchField } from './search_field'

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
  const { columns, data, onRowClick } = props

  const getCellValue = (row: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row)
    }

    return row[column.accessor]
  }

  return (
    <div className="flex flex-col pb-20">
      <div className="flex flex-col">
        <FiltersBar />

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
                  <div className="flex items-center flex-start">
                    <div className="text-[15px]/5 font-semibold">{column.header}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      <table className="">
        <colgroup>
          {columns.map((column, index) => (
            <col key={index} style={{ width: column.width, ...column.style }} />
          ))}
        </colgroup>
        <tbody>
          {data.map((row, i) => {
            return (
              <tr
                key={i}
                className={cn(
                  'bg-white',
                  !!onRowClick && 'border-b hover:bg-background cursor-pointer'
                )}
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

interface FiltersBarProps {
  searchPlaceholder?: string
}

function FiltersBar(props: FiltersBarProps) {
  const { searchPlaceholder } = props

  const { search = '' } = useSearchParams()

  return (
    <div className="grid grid-cols-3 gap-3 p-4 mb-4 rounded-xl bg-background">
      <SearchField
        placeholder={searchPlaceholder}
        defaultValue={search}
        onValueChange={(value) => {
          router.reload({ data: { search: value || undefined } })
        }}
      />
      <div />
    </div>
  )
}
