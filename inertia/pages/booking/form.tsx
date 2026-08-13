import { SubmitEvent } from 'react'
import { Data } from '@generated/data'
import { Head } from '@inertiajs/react'
import { Form } from '@base-ui/react/form'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { STEPS, useBookingForm } from '~/components/booking/use_booking_form'
import { StepClientInfos } from '~/components/booking/step_client_infos'
import { StepDateTime } from '~/components/booking/step_date_time'
import { StepPetInfos } from '~/components/booking/step_pet_infos'
import { StepService } from '~/components/booking/step_service'
import { StepReview } from '~/components/booking/step_review'
import { Button } from '~/components/ui/button'
import MinimalLayout from '~/layouts/minimal'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  tenant: Data.Tenants.Tenant
  location: Data.Tenants.Location
  services: Data.Services.Service[]
  species: Data.Pets.Species[]
}>

export default function ShowForm(props: PageProps) {
  const { tenant, location, services, species } = props

  const { form, step, isFirst, isLast, canContinue, actions } = useBookingForm({
    tenantId: tenant.id,
    submitUrl: urlFor('book_appointment.execute', { slug: location.slug }),
  })

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    actions.next()
  }

  const selectedService = services.find((service) => service.id === form.data.serviceId)
  const selectedSpecies = species.find((s) => s.id === form.data.petSpeciesId)
  const stepIndex = STEPS.findIndex((s) => s.key === step.key)

  return (
    <>
      <Head title={`${location.name} | Reserva`} />

      <header
        className={`sticky top-0 flex h-18 items-center justify-between bg-background transition-shadow z-100 border-b shadow-xs`}
      >
        <div className="container flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center">
            {location.logoUrl ? (
              <img src={location.logoUrl} alt={location.name} className="h-8 max-w-48 object-contain" />
            ) : (
              <div className="truncate text-[22px]/7 font-bold md:text-[26px]/8">{location.name}</div>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col bg-background">
        <div className="container flex-1 grid lg:grid-cols-[1fr_auto] gap-x-24 pb-3">
          <div className="min-inline-0">
            <div className="flex pt-9">
              <Button disabled={isFirst} onClick={actions.previous} variant="secondary">
                <ArrowLeftIcon />
                Volver
              </Button>
            </div>

            <div className="pt-9 pb-8">
              <div className="mb-2 text-[13px]/5 font-medium text-muted">
                Paso {stepIndex + 1} de {STEPS.length}
              </div>
              <h1 className="text-[28px]/9 md:text-[40px]/11 font-bold">{step.title}</h1>
            </div>

            <Form id="form" onSubmit={handleSubmit} className="flex w-full flex-col gap-4" errors={form.errors}>
              {step.key == 'service' && <StepService form={form} services={services} />}
              {step.key == 'datetime' && <StepDateTime form={form} />}
              {step.key == 'infos' && <StepClientInfos form={form} />}
              {step.key == 'pet' && <StepPetInfos form={form} species={species} />}
              {step.key == 'review' && (
                <StepReview
                  form={form}
                  service={selectedService!}
                  species={selectedSpecies!}
                  location={location}
                  stepKey="review"
                  showCover={false}
                />
              )}
            </Form>
          </div>

          {step.key !== 'review' && (
            <aside className="hidden lg:block lg:w-111">
              <div className="sticky top-27 lg:mt-18">
                <StepReview form={form} service={selectedService} location={location} stepKey={step.key} />
              </div>
            </aside>
          )}
        </div>

        <div className="sticky bottom-0 h-20 flex bg-white border-t z-10">
          <div className="container flex items-center justify-end">
            <Button type="submit" form="form" size="lg" disabled={form.processing || !canContinue}>
              {isLast ? 'Confirmar' : 'Continuar'}
              <ArrowRightIcon size={18} />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

ShowForm.layout = (page: React.ReactElement) => <MinimalLayout className="bg-background">{page}</MinimalLayout>
