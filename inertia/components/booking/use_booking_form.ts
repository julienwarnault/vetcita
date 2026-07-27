import { useState } from 'react'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useForm, type InertiaPrecognitiveFormProps } from '@inertiajs/react'
import { query, queryClient } from '~/lib/tuyau'

type BookingData = {
  tenantId: string
  serviceId: string
  agendaId: string
  startDate: string
  firstName: string
  lastName: string
  email: string
  phone: string
  petName: string
  petSpeciesId: string
}

export type BookingForm = InertiaPrecognitiveFormProps<BookingData>

type ClientInfo = Pick<BookingData, 'firstName' | 'lastName' | 'email' | 'phone'>

const DEFAULT_CLIENT_INFO: ClientInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
}

export const STEPS = [
  {
    key: 'service',
    title: 'Seleccionar servicio',
    fields: ['serviceId'],
    canContinue: (d: BookingData) => Boolean(d.serviceId),
  },
  {
    key: 'datetime',
    title: 'Seleccionar fecha y hora',
    fields: ['startDate', 'agendaId'],
    canContinue: (d: BookingData) => Boolean(d.startDate && d.agendaId),
  },
  {
    key: 'infos',
    title: 'Datos personales',
    fields: ['firstName', 'lastName', 'phone', 'email'],
    canContinue: (d: BookingData) => Boolean(d.firstName && d.lastName && d.phone && d.email),
  },
  {
    key: 'pet',
    title: 'Mascota',
    fields: ['petName', 'petSpeciesId'],
    canContinue: (d: BookingData) => Boolean(d.petName && d.petSpeciesId),
  },
  {
    key: 'review',
    title: 'Revisar y confirmar',
    fields: [],
    canContinue: () => true,
  },
] as const

export type StepKey = (typeof STEPS)[number]['key']

type UseBookingFormParams = {
  tenantId: string
  submitUrl: string
}

export function useBookingForm(params: UseBookingFormParams) {
  const { submitUrl, tenantId } = params

  const [stepIndex, setStepIndex] = useState(0)

  const [clientInfo, setClientInfo] = useLocalStorage<ClientInfo>('booking_client_info', DEFAULT_CLIENT_INFO)

  const form = useForm({
    tenantId: tenantId,
    serviceId: '',
    agendaId: '',
    startDate: '',
    firstName: clientInfo.firstName,
    lastName: clientInfo.lastName,
    email: clientInfo.email,
    phone: clientInfo.phone,
    petName: '',
    petSpeciesId: '',
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
      form.post(submitUrl, {
        replace: false,
        preserveState: false,
        onSuccess() {
          setClientInfo({
            firstName: form.data.firstName,
            lastName: form.data.lastName,
            email: form.data.email,
            phone: form.data.phone,
          })
          queryClient.invalidateQueries({
            queryKey: query.getBookableDays.render.pathKey(),
            exact: false,
          })
          queryClient.invalidateQueries({
            queryKey: query.getBookableSlots.render.pathKey(),
            exact: false,
          })
        },
      })
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
