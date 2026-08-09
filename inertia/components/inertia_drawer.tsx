import { XIcon } from 'lucide-react'
import { HeadlessModal, ModalInstance } from '@inertiaui/modal-react'
import { useEffect, useState, ReactNode, useCallback, useRef, Ref } from 'react'
import { animate, cancelAnimations } from '~/lib/animate'
import { useKeyPress } from '~/hooks/use_key_press'
import { Portal } from './ui/portal'
import { Button } from './ui/button'

interface InertiaDrawerProps {
  ref?: Ref<InertiaDrawerRef>
  children: ReactNode | ((props: ModalInstance) => ReactNode)
}

export interface InertiaDrawerRef {
  afterLeave: () => void
  close: () => void
  emit: (event: string, ...args: unknown[]) => void
}

export function InertiaDrawer(props: InertiaDrawerProps) {
  const { ref, children } = props

  return (
    <HeadlessModal ref={ref as any}>
      {({ isOpen, shouldRender, close, afterLeave, onTopOfStack, modalContext, ...rest }: any) => {
        if (!shouldRender) return null

        return (
          <DrawerPortal
            onClose={close}
            onAfterLeave={afterLeave}
            onTopOfStack={onTopOfStack}
            shouldRender={shouldRender}
            modalContext={modalContext}
          >
            {typeof children === 'function'
              ? children({ isOpen, shouldRender, close, afterLeave, onTopOfStack, ...rest })
              : children}
          </DrawerPortal>
        )
      }}
    </HeadlessModal>
  )
}

interface DrawerPortalProps {
  onClose: () => void
  onAfterLeave: () => void
  onTopOfStack: boolean
  shouldRender: boolean
  modalContext: ModalInstance
  children: ReactNode | ((props: { modalContext: ModalInstance }) => ReactNode)
}

function DrawerPortal(props: DrawerPortalProps) {
  const { onClose, onAfterLeave, onTopOfStack, shouldRender, modalContext, children } = props

  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isRendered, setIsRendered] = useState(false)
  const [entered, setEntered] = useState(false)

  useKeyPress('Escape', () => onClose(), onTopOfStack)

  const animateIn = useCallback(async (element: HTMLElement | null, onComplete?: () => void) => {
    if (!element) return
    cancelAnimations(element)
    await animate(element, [{ transform: 'translateX(120%)' }, { transform: 'translateX(0)' }])
    onComplete?.()
  }, [])

  const animateOut = useCallback(async (element: HTMLElement | null, onComplete?: () => void) => {
    if (!element) return
    cancelAnimations(element)
    await animate(element, [{ transform: 'translateX(0)' }, { transform: 'translateX(120%)' }])
    onComplete?.()
  }, [])

  const prevIsOpenRef = useRef(modalContext.isOpen)

  useEffect(() => {
    if (modalContext.isOpen && !isRendered) {
      setIsRendered(true)
    } else if (!modalContext.isOpen && prevIsOpenRef.current) {
      setEntered(false)
      animateOut(wrapperRef.current, () => {
        setIsRendered(false)
        onAfterLeave?.()
        modalContext.afterLeave()
        modalContext.close()
      })
    }
    prevIsOpenRef.current = modalContext.isOpen
  }, [modalContext.isOpen, animateOut, isRendered])

  useEffect(() => {
    if (isRendered && !entered && modalContext.isOpen) {
      animateIn(wrapperRef.current)
    }
  }, [isRendered, entered, modalContext.isOpen, animateIn])

  const prevOnTopOfStackRef = useRef(onTopOfStack)

  useEffect(() => {
    if (!isRendered) return

    if (!onTopOfStack && prevOnTopOfStackRef.current) {
      animateOut(wrapperRef.current)
    } else if (onTopOfStack && !prevOnTopOfStackRef.current) {
      animateIn(wrapperRef.current)
    }

    prevOnTopOfStackRef.current = onTopOfStack
  }, [onTopOfStack, isRendered, animateIn, animateOut])

  useEffect(() => {
    return () => {
      if (wrapperRef.current) {
        cancelAnimations(wrapperRef.current)
      }
    }
  }, [])

  if (!shouldRender) return null

  return (
    <Portal>
      <div ref={wrapperRef} role="dialog" className="fixed top-0 right-0 h-full z-100 transition-[filter] duration-300">
        <div className="flex flex-row bg-white shadow-2xl block-full">
          <div className="absolute -translate-x-full flex items-start p-3">
            <Button type="button" variant="secondary" size="icon-lg" className="shadow-lg" onClick={onClose}>
              <XIcon />
            </Button>
          </div>
          {typeof children === 'function' ? children({ modalContext }) : children}
        </div>
      </div>
    </Portal>
  )
}
