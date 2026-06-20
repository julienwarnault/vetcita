/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  getBookableDays: {
    render: typeof routes['get_bookable_days.render']
  }
  getBookableSlots: {
    render: typeof routes['get_bookable_slots.render']
  }
  dashboard: typeof routes['dashboard']
  settings: typeof routes['settings']
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
  listAppointmentStatuses: {
    render: typeof routes['list_appointment_statuses.render']
  }
  createAppointmentStatus: {
    render: typeof routes['create_appointment_status.render']
    execute: typeof routes['create_appointment_status.execute']
  }
  updateAppointmentStatus: {
    render: typeof routes['update_appointment_status.render']
    execute: typeof routes['update_appointment_status.execute']
  }
  moveAppointmentStatus: {
    execute: typeof routes['move_appointment_status.execute']
  }
  deleteAppointmentStatus: {
    execute: typeof routes['delete_appointment_status.execute']
  }
  listPatients: {
    render: typeof routes['list_patients.render']
    api: typeof routes['list_patients.api']
  }
  createPatient: {
    render: typeof routes['create_patient.render']
    execute: typeof routes['create_patient.execute']
  }
  updatePatient: {
    render: typeof routes['update_patient.render']
    execute: typeof routes['update_patient.execute']
  }
  getPatient: {
    render: typeof routes['get_patient.render']
    api: typeof routes['get_patient.api']
  }
  deletePatient: {
    execute: typeof routes['delete_patient.execute']
  }
  updateTenant: {
    render: typeof routes['update_tenant.render']
    execute: typeof routes['update_tenant.execute']
  }
  bookAppointment: {
    render: typeof routes['book_appointment.render']
    execute: typeof routes['book_appointment.execute']
  }
  confirmAppointment: {
    render: typeof routes['confirm_appointment.render']
  }
  showCalendar: {
    render: typeof routes['show_calendar.render']
  }
  bookingLink: {
    render: typeof routes['booking_link.render']
  }
  createAppointment: {
    render: typeof routes['create_appointment.render']
    execute: typeof routes['create_appointment.execute']
  }
  updateAppointment: {
    render: typeof routes['update_appointment.render']
    execute: typeof routes['update_appointment.execute']
  }
  changeAppointmentStatus: {
    execute: typeof routes['change_appointment_status.execute']
  }
  search: {
    render: typeof routes['search.render']
  }
  eventStream: typeof routes['event_stream']
  subscribe: typeof routes['subscribe']
  unsubscribe: typeof routes['unsubscribe']
}
