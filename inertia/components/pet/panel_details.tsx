import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { InfoItem } from '../ui/info_item'
import { Drawer } from '../ui/drawer'
import { Button } from '../ui/button'
import { urlFor } from '~/lib/tuyau'

interface PanelDetailsProps {
  pet: Data.Pets.Pet
  reload: () => void
}

export function PanelDetails(props: PanelDetailsProps) {
  const { pet, reload } = props
  const { visitModal } = useModalStack()

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr]">
      <Drawer.Header className="border-none px-8 pt-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[28px]/9 font-semibold">Datos de la mascota</h1>
          <Button
            variant="secondary"
            onClick={() => visitModal(urlFor('update_pet.render', { id: pet.id }), { onClose: reload })}
          >
            Editar
          </Button>
        </div>
      </Drawer.Header>
      <Drawer.Body className="flex">
        <div className="flex flex-col gap-6 w-full">
          <div className="text-[20px]/7 font-semibold">Ficha</div>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="Nombre" value={pet.name} />
            <InfoItem label="Especie" value={pet.species?.name} />
            <InfoItem
              label="Dueño"
              value={
                pet.client && (
                  <button
                    type="button"
                    className="hover:text-foreground text-left"
                    onClick={() => visitModal(urlFor('get_client.render', { id: pet.clientId }), { onClose: reload })}
                  >
                    {pet.client.fullName}
                  </button>
                )
              }
            />
            <InfoItem label="Sexo" value={pet.genderLabel} />
            <InfoItem label="Esterilizado" value={pet.isNeutered ? 'Sí' : 'No'} />
            <InfoItem label="Raza" value={pet.breed} />
            <InfoItem label="Fecha de nacimiento" value={pet.dateOfBirth} />
            <InfoItem label="Color" value={pet.color} />
            <InfoItem label="Peso" value={pet.weight ? `${pet.weight} kg` : undefined} />
            <InfoItem label="Grupo sanguíneo" value={pet.bloodType} />
            <InfoItem label="Alergias" value={pet.allergies} className="col-span-2 whitespace-pre-wrap" />
            <InfoItem label="Comentarios" value={pet.notes} className="col-span-2 whitespace-pre-wrap" />
          </div>
        </div>
      </Drawer.Body>
    </Drawer.MainPanel>
  )
}
