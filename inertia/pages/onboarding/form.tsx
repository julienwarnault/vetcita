import { SubmitEvent } from 'react'
import { Data } from '@generated/data'
import { Form } from '@base-ui/react/form'
import { Link } from '@adonisjs/inertia/react'
import { ArrowLeftIcon, ArrowRightIcon, LogOutIcon } from 'lucide-react'
import { useOnboardingForm } from '~/components/onboarding/use_onboarding_form'
import { StepSpecies } from '~/components/onboarding/step_species'
import { StepAddress } from '~/components/onboarding/step_address'
import { StepBasic } from '~/components/onboarding/step_basic'
import { FormHeader } from '~/components/form_header'
import { Popover } from '~/components/ui/popover'
import { Button } from '~/components/ui/button'
import { Avatar } from '~/components/ui/avatar'
import MinimalLayout from '~/layouts/minimal'
import { Badge } from '~/components/ui/badge'
import { menu } from '~/components/ui/menu'
import { Logo } from '~/components/logo'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  authUser: Data.Identity.User
  species: Data.Pets.Species[]
}>

export default function OnboardingForm(props: PageProps) {
  const { authUser, species } = props

  const { form, step, stepIndex, isFirst, isLast, canContinue, actions, totalSteps } = useOnboardingForm({
    authUser,
    submitUrl: '/onboarding',
    defaultSpeciesIds: species.filter((s) => s.isDefault).map((s) => s.id),
  })

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    actions.next()
  }

  return (
    <>
      <FormHeader
        leftElement={<Logo />}
        rightElement={
          <Popover
            align="end"
            trigger={
              <button className="ml-2">
                <Avatar fullName={authUser?.fullName ?? ''} />
              </button>
            }
            sideOffset={16}
            className="min-w-50 w-full"
          >
            <Link route="logout.execute" className={menu().item({ className: 'w-full' })}>
              <LogOutIcon />
              Cerrar sesión
            </Link>
          </Popover>
        }
        className="border-b bg-background"
      />

      <div className="flex-1 flex flex-col bg-background">
        <div className="container-sm flex-1">
          <div className="pt-10 pb-8">
            <Badge variant="secondary" size="lg" className="mb-4 bg-background">
              Paso {stepIndex + 1} de {totalSteps} - {step.description}
            </Badge>
            <h1 className="text-[28px]/9 font-bold">{step.title}</h1>
          </div>

          <Form id="onboarding-form" onSubmit={handleSubmit} errors={form.errors} className="flex flex-col gap-4 pb-24">
            {step.key === 'basic' && (
              <>
                <StepBasic form={form} />
                <StepAddress form={form} />
              </>
            )}
            {step.key === 'species' && <StepSpecies form={form} species={species} />}
          </Form>
        </div>

        <div className="sticky bottom-0 h-20 flex bg-background border-t z-10">
          <div className="container-sm flex items-center justify-between">
            <div>
              {!isFirst && (
                <Button type="button" size="lg" variant="secondary" onClick={actions.previous}>
                  <ArrowLeftIcon size={18} />
                  Atrás
                </Button>
              )}
            </div>

            <Button type="submit" size="lg" form="onboarding-form" disabled={form.processing || !canContinue}>
              {isLast ? 'Terminar' : 'Continuar'}
              <ArrowRightIcon size={18} />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

OnboardingForm.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
