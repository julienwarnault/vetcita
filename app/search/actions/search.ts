import { inject } from '@adonisjs/core'
import { SearchAppointments } from '#booking/queries/search_appointments'
import { SearchPatients } from '#patients/queries/search_patients'
import type { UUID } from '#shared/types'

interface SearchParams {
  tenantId: UUID
  search?: string
}

@inject()
export class Search {
  constructor(
    private readonly searchPatients: SearchPatients,
    private readonly searchAppointments: SearchAppointments
  ) {}

  async execute(params: SearchParams) {
    const search = params.search?.trim()

    const { patients } = await this.searchPatients.execute({
      tenantId: params.tenantId,
      search,
      limit: 40,
    })

    const { appointments } = await this.searchAppointments.execute({
      tenantId: params.tenantId,
      patientIds: search && patients?.length > 0 ? patients.map((patient) => patient.id) : undefined,
      search,
      limit: 40,
    })

    return { search: search ?? '', patients, appointments }
  }
}
