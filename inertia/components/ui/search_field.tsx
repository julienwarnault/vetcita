import { useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'
import { InputGroup } from './input_group'

interface SearchFieldProps {
  defaultValue?: string
  placeholder?: string
  onValueChange?: (value: string) => void
}

export function SearchField(props: SearchFieldProps) {
  const { defaultValue, placeholder = 'Buscar', onValueChange } = props

  const [search, setSearch] = useState(defaultValue ?? '')

  const debouncedChange = useDebouncedCallback((value: string) => {
    onValueChange?.(value)
  }, 300)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setSearch(newValue)
    debouncedChange(newValue)
  }

  return (
    <InputGroup className="rounded-full" inputSize="sm">
      <InputGroup.Input value={search} onChange={handleChange} placeholder={placeholder} />
      <InputGroup.Addon>
        <SearchIcon size={20} />
      </InputGroup.Addon>
    </InputGroup>
  )
}
