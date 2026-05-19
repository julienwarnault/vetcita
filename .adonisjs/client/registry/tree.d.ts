/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  dashboard: typeof routes['dashboard']
  calendar: typeof routes['calendar']
  login: {
    render: typeof routes['login.render']
    execute: typeof routes['login.execute']
  }
  logout: {
    execute: typeof routes['logout.execute']
  }
  listAgendas: {
    render: typeof routes['list_agendas.render']
  }
  createAgenda: {
    render: typeof routes['create_agenda.render']
    execute: typeof routes['create_agenda.execute']
  }
  updateAgenda: {
    render: typeof routes['update_agenda.render']
    execute: typeof routes['update_agenda.execute']
  }
  listAppointmentTypes: {
    render: typeof routes['list_appointment_types.render']
  }
  createAppointmentType: {
    render: typeof routes['create_appointment_type.render']
    execute: typeof routes['create_appointment_type.execute']
  }
  updateAppointmentType: {
    render: typeof routes['update_appointment_type.render']
    execute: typeof routes['update_appointment_type.execute']
  }
}
