import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
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
            <div>
              <div className="text-[15px]/5 font-medium">Nombre</div>
              <div className="text-[15px]/5 font-normal text-muted">{pet.name}</div>
            </div>
            <div>
              <div className="text-[15px]/5 font-medium">Especie</div>
              <div className="text-[15px]/5 font-normal text-muted">{pet.species?.name ?? '-'}</div>
            </div>
            <div>
              <div className="text-[15px]/5 font-medium">Dueño</div>
              {pet.client ? (
                <button
                  type="button"
                  className="text-[15px]/5 font-normal text-muted hover:text-foreground text-left"
                  onClick={() => visitModal(urlFor('get_client.render', { id: pet.clientId }), { onClose: reload })}
                >
                  {pet.client.fullName}
                </button>
              ) : (
                <div className="text-[15px]/5 font-normal text-muted">-</div>
              )}
            </div>
            <div>
              <div className="text-[15px]/5 font-medium">Sexo</div>
              <div className="text-[15px]/5 font-normal text-muted">{pet.genderLabel ?? '-'}</div>
            </div>
            <div>
              <div className="text-[15px]/5 font-medium">Esterilizado</div>
              <div className="text-[15px]/5 font-normal text-muted">{pet.isNeutered ? 'Sí' : 'No'}</div>
            </div>
            <div>
              <div className="text-[15px]/5 font-medium">Raza</div>
              <div className="text-[15px]/5 font-normal text-muted">{pet.breed ?? '-'}</div>
            </div>
            <div>
              <div className="text-[15px]/5 font-medium">Fecha de nacimiento</div>
              <div className="text-[15px]/5 font-normal text-muted">{pet.dateOfBirth ?? '-'}</div>
            </div>
            <div>
              <div className="text-[15px]/5 font-medium">Color</div>
              <div className="text-[15px]/5 font-normal text-muted">{pet.color ?? '-'}</div>
            </div>
            <div>
              <div className="text-[15px]/5 font-medium">Peso</div>
              <div className="text-[15px]/5 font-normal text-muted">{pet.weight ? `${pet.weight} kg` : '-'}</div>
            </div>
            <div>
              <div className="text-[15px]/5 font-medium">Grupo sanguíneo</div>
              <div className="text-[15px]/5 font-normal text-muted">{pet.bloodType ?? '-'}</div>
            </div>
            <div className="col-span-2">
              <div className="text-[15px]/5 font-medium">Alergias</div>
              <div className="text-[15px]/5 font-normal text-muted whitespace-pre-wrap">{pet.allergies || '-'}</div>
            </div>
            <div className="col-span-2">
              <div className="text-[15px]/5 font-medium">Comentarios</div>
              <div className="text-[15px]/5 font-normal text-muted whitespace-pre-wrap">{pet.notes || '-'}</div>
            </div>
          </div>
        </div>
      </Drawer.Body>
    </Drawer.MainPanel>
  )
}
