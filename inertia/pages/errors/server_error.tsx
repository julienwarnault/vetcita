import { Head } from '@inertiajs/react'
import type { ReactElement } from 'react'
import { ButtonLink } from '~/components/ui/button_link'
import { Logo } from '~/components/logo'

export default function ServerError() {
  return (
    <>
      <Head title="Error del servidor" />

      <div className="flex min-h-dvh flex-col bg-background">
        <header className="container-xl py-6">
          <div className="flex items-center justify-between">
            <Logo />
          </div>
        </header>

        <main className="container flex flex-1 items-center justify-center px-4 py-12 text-center">
          <div className="mx-auto max-w-130">
            <div className="text-[96px]/none font-bold md:text-[144px]/none">500</div>
            <h1 className="mt-5 text-[24px]/8 font-semibold md:text-[28px]/9">Error del servidor</h1>
            <p className="mt-3 text-[16px]/6 text-muted">
              Ocurrió un error inesperado. Puedes volver a intentarlo en unos instantes.
            </p>

            <ButtonLink route="dashboard.render" size="lg" className="mt-8">
              Ir al inicio
            </ButtonLink>
          </div>
        </main>
      </div>
    </>
  )
}

ServerError.layout = (page: ReactElement) => page
