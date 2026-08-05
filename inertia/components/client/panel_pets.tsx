import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { Drawer } from '../ui/drawer'
import { Avatar } from '../ui/avatar'
import { urlFor } from '~/lib/tuyau'
import { Empty } from '../ui/empty'
import { Card } from '../ui/card'

interface PanelPetsProps {
  pets: Data.Pets.Pet[]
  reload: () => void
}

export function PanelPets(props: PanelPetsProps) {
  const { pets, reload } = props

  const { visitModal } = useModalStack()

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr]">
      <Drawer.Header className="bg-background border-none px-8 pt-8">
        <h1 className="text-[28px]/9 font-semibold">Mascotas</h1>
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
                <Avatar src={pet.species?.illustrationUrl} />
                {pet.name}
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
