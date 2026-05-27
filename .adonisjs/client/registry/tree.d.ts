/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  getMonthAvailability: {
    render: typeof routes['get_month_availability.render']
  }
  getAvailableSlots: {
    render: typeof routes['get_available_slots.render']
  }
  getNextAvailableSlot: {
    render: typeof routes['get_next_available_slot.render']
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
  listPatients: {
    render: typeof routes['list_patients.render']
  }
  createPatient: {
    render: typeof routes['create_patient.render']
    execute: typeof routes['create_patient.execute']
  }
  updatePatient: {
    render: typeof routes['update_patient.render']
    execute: typeof routes['update_patient.execute']
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
}
