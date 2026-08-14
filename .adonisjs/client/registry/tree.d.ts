/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  dashboard: {
    render: typeof routes['dashboard.render']
  }
  showSettings: {
    render: typeof routes['show_settings.render']
  }
  signup: {
    render: typeof routes['signup.render']
    execute: typeof routes['signup.execute']
  }
  login: {
    render: typeof routes['login.render']
    execute: typeof routes['login.execute']
  }
  forgotPassword: {
    render: typeof routes['forgot_password.render']
    execute: typeof routes['forgot_password.execute']
  }
  resetPassword: {
    render: typeof routes['reset_password.render']
    execute: typeof routes['reset_password.execute']
  }
  showAccount: {
    render: typeof routes['show_account.render']
  }
  updateAccount: {
    execute: typeof routes['update_account.execute']
  }
  updatePassword: {
    render: typeof routes['update_password.render']
    execute: typeof routes['update_password.execute']
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
  deleteAgenda: {
    execute: typeof routes['delete_agenda.execute']
  }
  listServices: {
    render: typeof routes['list_services.render']
  }
  createService: {
    render: typeof routes['create_service.render']
    execute: typeof routes['create_service.execute']
  }
  updateService: {
    render: typeof routes['update_service.render']
    execute: typeof routes['update_service.execute']
  }
  deleteService: {
    execute: typeof routes['delete_service.execute']
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
  showTenant: {
    render: typeof routes['show_tenant.render']
  }
  updateTenant: {
    render: typeof routes['update_tenant.render']
    execute: typeof routes['update_tenant.execute']
  }
  updateLocation: {
    render: typeof routes['update_location.render']
    execute: typeof routes['update_location.execute']
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
  listAppointments: {
    render: typeof routes['list_appointments.render']
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
  bookingLink: {
    render: typeof routes['booking_link.render']
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
    api: typeof routes['list_pets.api']
  }
  createPet: {
    render: typeof routes['create_pet.render']
    execute: typeof routes['create_pet.execute']
  }
  getPet: {
    render: typeof routes['get_pet.render']
    api: typeof routes['get_pet.api']
  }
  updatePet: {
    render: typeof routes['update_pet.render']
    execute: typeof routes['update_pet.execute']
  }
  deletePet: {
    execute: typeof routes['delete_pet.execute']
  }
  listConsultations: {
    render: typeof routes['list_consultations.render']
  }
  createConsultation: {
    render: typeof routes['create_consultation.render']
    execute: typeof routes['create_consultation.execute']
  }
  updateConsultation: {
    render: typeof routes['update_consultation.render']
    execute: typeof routes['update_consultation.execute']
  }
  createVaccine: {
    render: typeof routes['create_vaccine.render']
    execute: typeof routes['create_vaccine.execute']
  }
  updateVaccine: {
    render: typeof routes['update_vaccine.render']
    execute: typeof routes['update_vaccine.execute']
  }
  createPrescription: {
    render: typeof routes['create_prescription.render']
    execute: typeof routes['create_prescription.execute']
  }
  updatePrescription: {
    render: typeof routes['update_prescription.render']
    execute: typeof routes['update_prescription.execute']
  }
  showOnboarding: {
    render: typeof routes['show_onboarding.render']
  }
  updateOnboarding: {
    execute: typeof routes['update_onboarding.execute']
  }
  eventStream: typeof routes['event_stream']
  subscribe: typeof routes['subscribe']
  unsubscribe: typeof routes['unsubscribe']
  attachments: typeof routes['attachments']
}
