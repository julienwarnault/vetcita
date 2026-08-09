import { cn } from 'tailwind-variants'
import { router } from '@inertiajs/react'
import useSearchParams from '~/hooks/use_search_params'
import { SearchField } from './ui/search_field'

interface FiltersBarProps {
  searchPlaceholder?: string
  className?: string
}

export function FiltersBar(props: FiltersBarProps) {
  const { searchPlaceholder, className } = props

  const { search = '' } = useSearchParams()

  return (
    <div className={cn('grid grid-cols-3 gap-3 p-4 mb-4 rounded-xl bg-background', className)}>
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
