import { toast } from 'sonner'
import { useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import usePageProps from './use_page_props'

export function useFlashToasts() {
  const { flash } = usePageProps()

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
