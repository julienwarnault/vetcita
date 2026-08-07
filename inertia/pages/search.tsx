import { XIcon } from 'lucide-react'
import { Data } from '@generated/data'
import { useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useModalStack } from '@inertiaui/modal-react'
import { InertiaModal, InertiaModalRef } from '~/components/inertia_modal'
import { AppointmentItem } from '~/components/appointment_item'
import { FormHeader } from '~/components/form_header'
import { formatPhoneNumber } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import { Avatar } from '~/components/ui/avatar'
import MinimalLayout from '~/layouts/minimal'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  search: string
  pets: Data.Pets.Pet[]
  appointments: Data.Booking.Appointment[]
}>

export default function Search(props: PageProps) {
  const { search: initialSearch = '', appointments, pets } = props

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
            Buscar por nombre de cliente, mascota, teléfono móvil, email o referencia de la reserva
          </p>
          <div className="grid gap-10 pt-12 lg:grid-cols-2">
            <div className="flex flex-col flex-1">
              <div className="text-[20px]/7 font-semibold pb-3.5">Próximas citas</div>
              {appointments?.length > 0 ? (
                <div className="flex-1">
                  {appointments.map((appointment) => (
                    <AppointmentItem key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              ) : (
                <p className="text-[15px]/5 text-muted">Ninguno encontrado</p>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <div className="text-[20px]/7 font-semibold pb-3.5">
                {`Mascotas ${!initialSearch ? '(añadidas recientemente)' : ''}`.trim()}
              </div>
              {pets?.length > 0 ? (
                <div className="flex-1">
                  {pets.map((pet) => (
                    <button
                      key={pet.id}
                      className="flex items-center pl-4 pr-6 py-4 gap-3 hover:bg-background w-full rounded-xl"
                      onClick={() => visitModal(urlFor('get_pet.render', { id: pet.id }))}
                    >
                      <Avatar size="xl" src={pet.species?.illustrationUrl} />
                      <div className="flex flex-col items-start">
                        <div className="text-[15px]/5">{pet.name}</div>
                        <div className="text-[15px]/5 text-muted">{pet.client?.fullName}</div>
                        <div className="text-[15px]/5 text-muted">{formatPhoneNumber(pet.client?.phone ?? '')}</div>
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
