import { Data } from '@generated/data'
import { usePage } from '@inertiajs/react'

export default function useSearchParams() {
  const { qs } = usePage<Data.SharedProps>().props
  return qs || {}
}
