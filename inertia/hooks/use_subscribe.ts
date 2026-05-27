import { useEffect, useEffectEvent } from 'react'
import { transmit } from '~/lib/transmit'

interface UseSubscribeProps<T> {
  channel: string
  onMessage: (data: T) => void
}

export function useSubscribe<T>(props: UseSubscribeProps<T>): void {
  const { channel, onMessage } = props

  const handleMessage = useEffectEvent(onMessage)

  useEffect(() => {
    if (!transmit) return

    const subscription = transmit.subscription(channel)

    // Add listener first (can be done before create() per docs)
    const stopListening = subscription.onMessage((newData: T) => handleMessage(newData))

    // Then register subscription on server
    void subscription.create()

    return () => {
      // Remove the message handler
      stopListening()
      // Delete the subscription from the server
      void subscription.delete()
    }
  }, [channel])
}
