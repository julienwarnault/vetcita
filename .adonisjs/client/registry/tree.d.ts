/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  dashboard: {
    render: typeof routes['dashboard.render']
  }
  settings: typeof routes['settings']
  signup: {
    render: typeof routes['signup.render']
    execute: typeof routes['signup.execute']
  }
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
  listClients: {
    render: typeof routes['list_clients.render']
    api: typeof routes['list_clients.api']
  }
  createClient: {
    render: typeof routes['create_client.render']
    execute: typeof routes['create_client.execute']
  }
  updateClient: {
    render: typeof routes['update_client.render']
    execute: typeof routes['update_client.execute']
  }
  getClient: {
    render: typeof routes['get_client.render']
    api: typeof routes['get_client.api']
  }
  deleteClient: {
    execute: typeof routes['delete_client.execute']
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
  listShifts: {
    render: typeof routes['list_shifts.render']
  }
  createClosedDate: {
    render: typeof routes['create_closed_date.render']
    execute: typeof routes['create_closed_date.execute']
  }
  updateClosedDate: {
    render: typeof routes['update_closed_date.render']
    execute: typeof routes['update_closed_date.execute']
  }
  deleteClosedDate: {
    execute: typeof routes['delete_closed_date.execute']
  }
  createTimeOff: {
    render: typeof routes['create_time_off.render']
    execute: typeof routes['create_time_off.execute']
  }
  updateTimeOff: {
    render: typeof routes['update_time_off.render']
    execute: typeof routes['update_time_off.execute']
  }
  deleteTimeOff: {
    execute: typeof routes['delete_time_off.execute']
  }
  updateWorkingHours: {
    render: typeof routes['update_working_hours.render']
    execute: typeof routes['update_working_hours.execute']
  }
  createScheduleDay: {
    render: typeof routes['create_schedule_day.render']
    execute: typeof routes['create_schedule_day.execute']
  }
  updateScheduleDay: {
    render: typeof routes['update_schedule_day.render']
    execute: typeof routes['update_schedule_day.execute']
  }
  deleteScheduleDay: {
    execute: typeof routes['delete_schedule_day.execute']
  }
  getBookableDays: {
    render: typeof routes['get_bookable_days.render']
  }
  getBookableSlots: {
    render: typeof routes['get_bookable_slots.render']
  }
  search: {
    render: typeof routes['search.render']
  }
  listPets: {
    render: typeof routes['list_pets.render']
  }
  createPet: {
    render: typeof routes['create_pet.render']
    execute: typeof routes['create_pet.execute']
  }
  getPet: {
    render: typeof routes['get_pet.render']
  }
  updatePet: {
    render: typeof routes['update_pet.render']
    execute: typeof routes['update_pet.execute']
  }
  eventStream: typeof routes['event_stream']
  subscribe: typeof routes['subscribe']
  unsubscribe: typeof routes['unsubscribe']
}
