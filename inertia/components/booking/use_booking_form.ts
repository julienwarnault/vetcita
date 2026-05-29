import { useState } from 'react'
import { useForm, type InertiaPrecognitiveFormProps } from '@inertiajs/react'

type BookingData = {
  tenantId: string
  appointmentTypeId: string
  startDate: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type BookingForm = InertiaPrecognitiveFormProps<BookingData>

export const STEPS = [
  {
    key: 'type',
    title: 'Seleccionar tipo de cita',
    fields: ['appointmentTypeId'],
    canContinue: (d: BookingData) => Boolean(d.appointmentTypeId),
  },
  {
    key: 'datetime',
    title: 'Seleccionar fecha y hora',
    fields: ['startDate'],
    canContinue: (d: BookingData) => Boolean(d.startDate),
  },
  {
    key: 'infos',
    title: 'Datos personales',
    fields: ['firstName', 'lastName', 'phone', 'email'],
    canContinue: (d: BookingData) => Boolean(d.firstName && d.lastName && d.phone && d.email),
  },
  {
    key: 'review',
    title: 'Revisar y confirmar',
    fields: [],
    canContinue: () => true,
  },
] as const

type UseBookingFormParams = {
  tenantId: string
  submitUrl: string
}

export function useBookingForm(params: UseBookingFormParams) {
  const { submitUrl, tenantId } = params

  const [stepIndex, setStepIndex] = useState(0)

  const form = useForm({
    tenantId: tenantId,
    appointmentTypeId: '',
    startDate: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  }).withPrecognition('post', submitUrl)

  const step = STEPS[stepIndex]
  const isFirst = stepIndex === 0
  const isLast = stepIndex === STEPS.length - 1

  const canContinue = step.canContinue?.(form.data)

  function previous() {
    if (!isFirst) {
      setStepIndex((i) => i - 1)
      form.clearErrors()
      window.scrollTo({ left: 0, top: 0 })
    }
  }

  function next() {
    if (isLast) {
      form.post(submitUrl, { replace: false, preserveState: false })
      return
    }

    const fields = step.fields

    if (fields.length === 0) {
      setStepIndex((i) => i + 1)
      window.scrollTo({ left: 0, top: 0 })
      return
    }

    form.validate({
      only: fields,
      onSuccess: () => {
        setStepIndex((i) => i + 1)
      },
    })
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
