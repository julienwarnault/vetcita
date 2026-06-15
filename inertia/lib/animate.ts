export interface AnimateOptions {
  duration?: number
}

const defaultOptions: Required<AnimateOptions> = {
  duration: 300,
}

export function animate(
  element: HTMLElement,
  keyframes: Keyframe[],
  options?: AnimateOptions
): Promise<Animation> {
  const { duration } = { ...defaultOptions, ...options }

  const animation = element.animate(keyframes, {
    duration: duration,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    fill: 'forwards',
  })

  return animation.finished.catch(() => animation)
}

export function cancelAnimations(element: HTMLElement): void {
  element.getAnimations().forEach((animation) => animation.cancel())
}
