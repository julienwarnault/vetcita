import { toast } from 'sonner'
import { useEffect } from 'react'
import { usePage } from '@inertiajs/react'

export function useFlashToasts() {
  const { flash, url } = usePage()

  useEffect(() => {
    toast.dismiss()
  }, [url])

  useEffect(() => {
    if (flash.error) {
      toast.error(flash.error)
    }
    if (flash.success) {
      toast.success(flash.success)
    }
  }, [flash])
}
