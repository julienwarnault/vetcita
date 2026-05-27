import { usePage } from '@inertiajs/react'
import { type Data } from '@generated/data'

export default function usePageProps() {
  return usePage<Data.SharedProps>().props
}
