import { toast } from 'sonner'
import { useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import { type Data } from '@generated/data'

export function useFlashToasts() {
  const { flash } = usePage<Data.SharedProps>().props

  useEffect(() => {
    toast.dismiss()
  }, [usePage().url])

  useEffect(() => {
    if (flash.error) {
      toast.error(flash.error)
    }
    if (flash.success) {
      toast.success(flash.success)
    }
  }, [flash])
}
