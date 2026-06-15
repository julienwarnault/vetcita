import { HeadlessModal, ModalInstance } from '@inertiaui/modal-react'
import { useEffect, useState, ReactNode, useCallback, useRef } from 'react'
import { animate, cancelAnimations } from '~/lib/animate'
import { Portal } from './ui/portal'

interface InertiaModalProps {
  children: ReactNode | ((props: ModalInstance) => ReactNode)
}

export function InertiaModal(props: InertiaModalProps) {
  const { children } = props

  return (
    <HeadlessModal>
      {({ isOpen, shouldRender, close, afterLeave, onTopOfStack, modalContext, ...rest }: any) => {
        if (!shouldRender) return null

        return (
          <ModalPortal
            onClose={close}
            onAfterLeave={afterLeave}
            shouldRender={shouldRender}
            modalContext={modalContext}
          >
            {typeof children === 'function'
              ? children({ isOpen, shouldRender, close, afterLeave, onTopOfStack, ...rest })
              : children}
          </ModalPortal>
        )
      }}
    </HeadlessModal>
  )
}

interface ModalPortalProps {
  onClose: () => void
  onAfterLeave: () => void
  shouldRender: boolean
  modalContext: ModalInstance
  children: ReactNode | ((props: { modalContext: ModalInstance }) => ReactNode)
}

function ModalPortal(props: ModalPortalProps) {
  const { onAfterLeave, shouldRender, modalContext, children } = props

  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isRendered, setIsRendered] = useState(false)
  const [entered, setEntered] = useState(false)

  const animateIn = useCallback(async (element: HTMLElement | null) => {
    if (!element) return
    cancelAnimations(element)
    await animate(
      element,
      [
        { transform: 'translateY(20%)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ],
      { duration: 200 }
    )
  }, [])

  const animateOut = useCallback(async (element: HTMLElement | null) => {
    if (!element) return
    cancelAnimations(element)
    await animate(
      element,
      [
        { transform: 'translateY(0)', opacity: 1 },
        { transform: 'translateY(20%)', opacity: 0 },
      ],
      { duration: 200 }
    )
    setIsRendered(false)
    onAfterLeave?.()
    modalContext.afterLeave()
    modalContext.close()
  }, [])

  const prevIsOpenRef = useRef(modalContext.isOpen)

  useEffect(() => {
    if (modalContext.isOpen && !isRendered) {
      setIsRendered(true)
    } else if (!modalContext.isOpen && prevIsOpenRef.current) {
      setEntered(false)
      animateOut(wrapperRef.current)
    }
    prevIsOpenRef.current = modalContext.isOpen
  }, [modalContext.isOpen, animateOut, isRendered])

  useEffect(() => {
    if (isRendered && !entered && modalContext.isOpen) {
      animateIn(wrapperRef.current)
    }
  }, [isRendered, entered, modalContext.isOpen, animateIn])

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
      <div
        ref={wrapperRef}
        role="dialog"
        className="fixed inset-0 z-100 transition-[filter] duration-200 bg-white overflow-auto overscroll-none h-full"
      >
        {typeof children === 'function' ? children({ modalContext }) : children}
      </div>
    </Portal>
  )
}
