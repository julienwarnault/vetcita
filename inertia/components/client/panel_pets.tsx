import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { Button } from '../ui/button'
import { Drawer } from '../ui/drawer'
import { Avatar } from '../ui/avatar'
import { urlFor } from '~/lib/tuyau'
import { Empty } from '../ui/empty'
import { Card } from '../ui/card'

interface PanelPetsProps {
  clientId: string
  pets: Data.Pets.Pet[]
  reload: () => void
}

export function PanelPets(props: PanelPetsProps) {
  const { clientId, pets, reload } = props

  const { visitModal } = useModalStack()

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr]">
      <Drawer.Header className="bg-background border-none px-8 pt-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[28px]/9 font-semibold">Mascotas</h1>
          <Button
            variant="secondary"
            onClick={() => visitModal(urlFor('create_pet.render', {}, { qs: { clientId } }), { onClose: reload })}
          >
            Añadir
          </Button>
        </div>
      </Drawer.Header>
      <Drawer.Body className="bg-background">
        <div className="flex flex-col gap-2 w-full">
          {pets.map((pet) => {
            return (
              <Card
                key={pet.id}
                size="lg"
                className="flex flex-row items-center gap-4 cursor-pointer hover:border-border-strong"
                onClick={() => {
                  visitModal(urlFor('get_pet.render', { id: pet.id }), {
                    onClose: reload,
                  })
                }}
              >
                <Avatar size="xl" src={pet.species?.illustrationUrl} />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="text-[17px]/6 font-semibold">{pet.name}</div>
                  <div className="text-[13px]/4 text-muted separator-dot">
                    <span>{pet.species?.name ?? 'Sin especie'}</span>
                    {pet.breed && <span>{pet.breed}</span>}
                    {pet.genderLabel && <span>{pet.genderLabel}</span>}
                  </div>
                  <div className="text-[13px]/4 text-muted separator-dot">
                    {pet.weight && <span>{pet.weight} kg</span>}
                    {pet.color && <span>{pet.color}</span>}
                    <span>{pet.isNeutered ? 'Esterilizado/a' : 'No esterilizado/a'}</span>
                  </div>
                </div>
              </Card>
            )
          })}
          {pets.length == 0 && (
            <Empty heading="No hay mascotas" description="No se han creado mascotas para este cliente" border={true} />
          )}
        </div>
      </Drawer.Body>
    </Drawer.MainPanel>
  )
}
