import { DateTime } from 'luxon'
import { XIcon } from 'lucide-react'
import { Data } from '@generated/data'
import { useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useModalStack } from '@inertiaui/modal-react'
import { InertiaModal, InertiaModalRef } from '~/components/inertia_modal'
import { formatDuration, formatPhoneNumber } from '~/lib/utils'
import { FormHeader } from '~/components/form_header'
import { Button } from '~/components/ui/button'
import { Avatar } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import MinimalLayout from '~/layouts/minimal'
import { DEFAULT_LOCALE } from '~/lib/date'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  search: string
  patients: Data.Patients.Patient[]
  appointments: Data.Booking.Appointment[]
}>

export default function Search(props: PageProps) {
  const { search: initialSearch = '', appointments, patients } = props

  const modalRef = useRef<InertiaModalRef>(null)

  const { visitModal } = useModalStack()

  const [search, setSearch] = useState(initialSearch)

  const debounced = useDebouncedCallback((value) => {
    modalRef.current?.reload({ data: { q: value } })
  }, 300)

  function handleSearchChange(value: string) {
    setSearch(value)
    debounced(value)
  }

  return (
    <InertiaModal ref={modalRef}>
      <FormHeader
        rightElement={
          <Button size="icon-lg" variant="secondary" onClick={() => modalRef.current?.close()}>
            <XIcon />
          </Button>
        }
      />

      <div className="container">
        <div className="flex flex-col pt-4">
          <div className="relative mb-3">
            <div className="text-5xl/16.5 absolute bottom-0 h-1 bg-foreground translate-y-[1.5px]">
              <span className="h-0 overflow-hidden block">{search}</span>
            </div>
            <input
              type="text"
              defaultValue={initialSearch}
              className="text-5xl/16.5 font-medium border-b w-full outline-none"
              placeholder="¿Qué estás buscando?"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <p className="text-[15px]/5 text-muted">
            Buscar por nombre de paciente, teléfono móvil, email o referencia de la reserva
          </p>
          <div className="flex flex-row gap-15 pt-12">
            <div className="flex flex-col flex-1">
              <div className="text-[20px]/7 font-semibold pb-3.5">Próximas citas</div>
              {appointments?.length > 0 ? (
                <div className="flex-1">
                  {appointments.map((appointment) => {
                    const startDate = DateTime.fromISO(appointment.localStartDate!)

                    return (
                      <button
                        key={appointment.id}
                        className="flex not-last:border-b w-full px-6 hover:bg-background"
                        onClick={() => visitModal(urlFor('update_appointment.render', { id: appointment.id }))}
                      >
                        <div className="flex flex-row items-start py-5">
                          <div className="flex flex-col mr-4 text-center">
                            <span className="text-[17px]/6 font-semibold">
                              {startDate.setLocale(DEFAULT_LOCALE).toFormat('d')}
                            </span>
                            <span className="text-[15px]/5">
                              {startDate.setLocale(DEFAULT_LOCALE).toFormat('LLL.')}
                            </span>
                          </div>
                          <div className="flex flex-col text-left">
                            <div className="flex gap-2">
                              <div className="text-[15px]/5 text-muted">
                                {`${startDate.setLocale(DEFAULT_LOCALE).toFormat('ccc.').toLowerCase()} ${startDate.toFormat('h:mma').toLowerCase()}`}
                              </div>
                              <Badge size="md" color={appointment.status?.color}>
                                {appointment?.status?.name}
                              </Badge>
                            </div>
                            <div className="flex flex-col">
                              <div className="text-[17px]/6 font-semibold">{appointment.appointmentType?.name}</div>
                              <div className="text-[15px]/5 text-muted">
                                {`${appointment.patient ? `${appointment.patient.fullName},` : ''} ${formatDuration(appointment.duration)} con ${appointment.agenda?.name}`.trim()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <p className="text-[15px]/5 text-muted">Ninguno encontrado</p>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <div className="text-[20px]/7 font-semibold pb-3.5">
                {`Clientes ${!initialSearch ? '(añadidos recientemente)' : ''}`.trim()}
              </div>
              {patients?.length > 0 ? (
                <div className="flex-1">
                  {patients.map((patient) => (
                    <button
                      key={patient.id}
                      className="flex items-center pl-4 pr-6 py-4 gap-3 hover:bg-background w-full rounded-xl"
                      onClick={() => visitModal(urlFor('get_patient.render', { id: patient.id }))}
                    >
                      <Avatar size="xl" fullName={patient.fullName} />
                      <div className="flex flex-col items-start">
                        <div className="text-[15px]/5">{patient?.fullName || 'Sin cita'}</div>
                        <div className="text-[15px]/5 text-muted">{formatPhoneNumber(patient.phone)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-[15px]/5 text-muted">Ninguno encontrado</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </InertiaModal>
  )
}

Search.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
