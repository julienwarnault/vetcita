import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { DEFAULT_LOCALE } from '~/lib/date'
import { Drawer } from '../ui/drawer'

interface PanelDetailsProps {
  pet: Data.Pets.Pet
}

export function PanelDetails(props: PanelDetailsProps) {
  const { pet } = props

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr]">
      <Drawer.Header className="border-none px-8 pt-8">
        <h1 className="text-[28px]/9 font-semibold">Datos de la mascota</h1>
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
              <div className="text-[15px]/5 font-medium">Especias</div>
              <div className="text-[15px]/5 font-normal text-muted">{pet.species?.name ?? '-'}</div>
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
              <div className="text-[15px]/5 font-medium">Creado el</div>
              <div className="text-[15px]/5 font-normal text-muted">
                {DateTime.fromISO(pet.createdAt!).setLocale(DEFAULT_LOCALE).toFormat('d ccc. yyyy')}
              </div>
            </div>
          </div>
        </div>
      </Drawer.Body>
    </Drawer.MainPanel>
  )
}
