import { useState } from 'react'
import type { Data } from '@generated/data'
import { useForm, type InertiaFormProps } from '@inertiajs/react'

export type OnboardingData = {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  postalCode: string
  countryCode: string
}

export type OnboardingForm = InertiaFormProps<OnboardingData>

export const STEPS = [
  {
    key: 'basic',
    title: 'Empecemos por identificar tu clínica',
    description: 'Datos principales y ubicación.',
    fields: ['name', 'phone', 'email', 'address', 'city', 'state', 'postalCode', 'countryCode'] as string[],
    canContinue: (data: OnboardingData) => Boolean(data.name),
  },
] as const

type UseOnboardingFormParams = {
  tenant: Data.Tenants.Tenant
  services: Data.Services.Service[]
  submitUrl: string
}

export function useOnboardingForm(params: UseOnboardingFormParams) {
  const { tenant, submitUrl } = params
  const [stepIndex, setStepIndex] = useState(0)

  const form = useForm<OnboardingData>({
    name: tenant.name ?? '',
    email: tenant.email ?? '',
    phone: tenant.phone ?? '',
    address: tenant.address ?? '',
    city: tenant.city ?? '',
    state: tenant.state ?? '',
    postalCode: tenant.postalCode ?? '',
    countryCode: tenant.countryCode ?? 'MX',
  })

  const step = STEPS[stepIndex]
  const isFirst = stepIndex === 0
  const isLast = stepIndex === STEPS.length - 1
  const canContinue = step.canContinue(form.data)

  function previous() {
    if (!isFirst) {
      setStepIndex((index) => index - 1)
      form.clearErrors()
      window.scrollTo({ left: 0, top: 0 })
    }
  }

  function next() {
    submitOrContinue()
  }

  function submitOrContinue() {
    if (isLast) {
      form.transform((data) => ({
        ...data,
        email: data.email || undefined,
        phone: data.phone || undefined,
      }))

      form.post(submitUrl)
      return
    }

    setStepIndex((index) => index + 1)
    form.clearErrors()
    window.scrollTo({ left: 0, top: 0 })
  }

  return {
    step,
    stepIndex,
    isFirst,
    isLast,
    canContinue,
    form,
    actions: { next, previous },
    totalSteps: STEPS.length,
  }
}
