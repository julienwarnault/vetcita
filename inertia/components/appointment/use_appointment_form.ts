import { useEffect, useState } from 'react'
import type { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { useForm, type InertiaPrecognitiveFormProps } from '@inertiajs/react'
import { query, queryClient } from '~/lib/tuyau'

type AppointmentData = {
  id: string
  tenantId: string
  patientId: string
  appointmentTypeId: string
  agendaId: string
  startDate: string
}

export type AppointmentForm = InertiaPrecognitiveFormProps<AppointmentData>

export const STEPS = [
  {
    key: 'type',
    fields: ['appointmentTypeId'],
    canContinue: (d: AppointmentData) => Boolean(d.appointmentTypeId),
  },
  {
    key: 'datetime',
    fields: ['startDate', 'agendaId'],
    canContinue: (d: AppointmentData) => Boolean(d.startDate && d.agendaId),
  },
  {
    key: 'review',
    fields: [],
    canContinue: () => true,
  },
] as const

type UseAppointmentFormParams = {
  tenantId: string
  patientId?: string
  appointment?: Data.Booking.Appointment
  submitUrl: string
  method: 'post' | 'put'
}

export function useAppointmentForm(params: UseAppointmentFormParams) {
  const { method, submitUrl, appointment, tenantId, patientId } = params

  const { closeAll } = useModalStack()

  const [stepIndex, setStepIndex] = useState(appointment ? 2 : 0)

  const form = useForm({
    id: appointment?.id ?? '',
    tenantId: tenantId,
    patientId: appointment?.patientId ?? patientId ?? '',
    appointmentTypeId: appointment?.appointmentTypeId ?? '',
    agendaId: appointment?.agendaId ?? '',
    startDate: appointment?.localStartDate ?? '',
  }).withPrecognition(method, submitUrl)

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

  function goToStep(index: number) {
    if (index >= 0 && index < STEPS.length) {
      setStepIndex(index)
      form.clearErrors()
      window.scrollTo({ left: 0, top: 0 })
    }
  }

  function next() {
    if (isLast) {
      form[method](submitUrl, {
        onSuccess() {
          queryClient.invalidateQueries({
            queryKey: query.getBookableDays.render.pathKey(),
            exact: false,
          })
          queryClient.invalidateQueries({
            queryKey: query.getBookableSlots.render.pathKey(),
            exact: false,
          })
          closeAll()
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

  useEffect(() => {
    form.setData((old) => ({
      ...old,
      id: appointment?.id ?? '',
      tenantId: tenantId,
      patientId: appointment?.patientId ?? patientId ?? '',
      appointmentTypeId: appointment?.appointmentTypeId ?? '',
      agendaId: appointment?.agendaId ?? '',
      startDate: appointment?.localStartDate ?? '',
    }))
  }, [appointment, patientId])

  return {
    step,
    stepIndex,
    isFirst,
    isLast,
    canContinue,
    form,
    actions: { next, previous, goToStep },
    totalSteps: STEPS.length,
  }
}
