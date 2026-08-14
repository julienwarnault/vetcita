import { ReactNode } from 'react'
import { cn } from 'tailwind-variants'
import { router } from '@inertiajs/react'
import useSearchParams from '~/hooks/use_search_params'
import { SearchField } from './ui/search_field'

interface FiltersBarProps {
  searchPlaceholder?: string
  className?: string
  children?: ReactNode
}

export function FiltersBar(props: FiltersBarProps) {
  const { searchPlaceholder, className, children } = props

  const searchParams = useSearchParams()
  const { search = '' } = searchParams

  return (
    <div className={cn('grid grid-cols-3 gap-3 p-4 mb-4 rounded-xl bg-background', className)}>
      <SearchField
        placeholder={searchPlaceholder}
        defaultValue={search}
        onValueChange={(value) => {
          router.reload({ data: { ...searchParams, search: value || undefined } })
        }}
      />
      {children && <div className="flex justify-end gap-2 col-span-2">{children}</div>}
    </div>
  )
}
