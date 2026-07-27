import { SubmitEvent } from 'react'
import { Data } from '@generated/data'
import { Head } from '@inertiajs/react'
import { Form } from '@base-ui/react/form'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { StepClientInfos } from '~/components/booking/step_client_infos'
import { useBookingForm } from '~/components/booking/use_booking_form'
import { StepDateTime } from '~/components/booking/step_date_time'
import { StepPetInfos } from '~/components/booking/step_pet_infos'
import { StepService } from '~/components/booking/step_service'
import { StepReview } from '~/components/booking/step_review'
import { FormHeader } from '~/components/form_header'
import { Button } from '~/components/ui/button'
import MinimalLayout from '~/layouts/minimal'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  tenant: Data.Tenants.Tenant
  services: Data.Services.Service[]
  species: Data.Pets.Species[]
}>

export default function ShowForm(props: PageProps) {
  const { tenant, services, species } = props

  const { form, step, isFirst, isLast, canContinue, actions } = useBookingForm({
    tenantId: tenant.id,
    submitUrl: urlFor('book_appointment.execute', { tenantId: tenant.id }),
  })

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    actions.next()
  }

  const selectedService = services.find((service) => service.id === form.data.serviceId)
  const selectedSpecies = species.find((s) => s.id === form.data.petSpeciesId)

  return (
    <>
      <Head title={`${tenant.name} | Reserva`} />

      <FormHeader
        title={step.title}
        className="bg-background"
        leftElement={
          <Button size="icon-lg" variant="secondary" disabled={isFirst} onClick={actions.previous}>
            <ArrowLeftIcon size={18} />
          </Button>
        }
      />

      <div className="flex-1 flex flex-col bg-background">
        <div className="container flex-1 grid lg:grid-cols-[1fr_auto] gap-x-24 pb-3">
          <div className="min-inline-0">
            <div className="pt-9 pb-8">
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
                  tenant={tenant}
                  stepKey="review"
                />
              )}
            </Form>
          </div>
          {step.key !== 'review' && (
            <aside className="hidden lg:block lg:w-111">
              <div className="sticky top-27 mt-9">
                <StepReview form={form} service={selectedService} tenant={tenant} stepKey={step.key} />
              </div>
            </aside>
          )}
        </div>

        {canContinue && (
          <div className="sticky bottom-0 h-20 flex bg-white border-t z-10">
            <div className="container-sm flex items-center justify-end">
              <Button type="submit" form="form" size="lg" disabled={form.processing}>
                {isLast ? 'Confirmar' : 'Continuar'}
                <ArrowRightIcon size={18} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

ShowForm.layout = (page: React.ReactElement) => <MinimalLayout className="bg-background">{page}</MinimalLayout>
