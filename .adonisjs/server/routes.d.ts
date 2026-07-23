import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'dashboard.render': { paramsTuple?: []; params?: {} }
    'settings': { paramsTuple?: []; params?: {} }
    'signup.render': { paramsTuple?: []; params?: {} }
    'signup.execute': { paramsTuple?: []; params?: {} }
    'login.render': { paramsTuple?: []; params?: {} }
    'login.execute': { paramsTuple?: []; params?: {} }
    'logout.execute': { paramsTuple?: []; params?: {} }
    'list_agendas.render': { paramsTuple?: []; params?: {} }
    'create_agenda.render': { paramsTuple?: []; params?: {} }
    'create_agenda.execute': { paramsTuple?: []; params?: {} }
    'update_agenda.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_agenda.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_appointment_types.render': { paramsTuple?: []; params?: {} }
    'create_appointment_type.render': { paramsTuple?: []; params?: {} }
    'create_appointment_type.execute': { paramsTuple?: []; params?: {} }
    'update_appointment_type.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_appointment_type.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_appointment_statuses.render': { paramsTuple?: []; params?: {} }
    'create_appointment_status.render': { paramsTuple?: []; params?: {} }
    'create_appointment_status.execute': { paramsTuple?: []; params?: {} }
    'update_appointment_status.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_appointment_status.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'move_appointment_status.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'delete_appointment_status.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_clients.render': { paramsTuple?: []; params?: {} }
    'create_client.render': { paramsTuple?: []; params?: {} }
    'create_client.execute': { paramsTuple?: []; params?: {} }
    'update_client.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'get_client.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_client.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'delete_client.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_clients.api': { paramsTuple?: []; params?: {} }
    'get_client.api': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_tenant.render': { paramsTuple?: []; params?: {} }
    'update_tenant.execute': { paramsTuple?: []; params?: {} }
    'book_appointment.render': { paramsTuple: [ParamValue]; params: {'tenantId': ParamValue} }
    'book_appointment.execute': { paramsTuple: [ParamValue]; params: {'tenantId': ParamValue} }
    'confirm_appointment.render': { paramsTuple: [ParamValue,ParamValue]; params: {'tenantId': ParamValue,'appointmentId': ParamValue} }
    'show_calendar.render': { paramsTuple?: []; params?: {} }
    'booking_link.render': { paramsTuple?: []; params?: {} }
    'create_appointment.render': { paramsTuple?: []; params?: {} }
    'create_appointment.execute': { paramsTuple?: []; params?: {} }
    'update_appointment.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_appointment.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'change_appointment_status.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_shifts.render': { paramsTuple?: []; params?: {} }
    'create_closed_date.render': { paramsTuple?: []; params?: {} }
    'create_closed_date.execute': { paramsTuple?: []; params?: {} }
    'update_closed_date.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_closed_date.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'delete_closed_date.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'create_time_off.render': { paramsTuple?: []; params?: {} }
    'create_time_off.execute': { paramsTuple?: []; params?: {} }
    'update_time_off.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_time_off.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'delete_time_off.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_working_hours.render': { paramsTuple: [ParamValue]; params: {'agendaId': ParamValue} }
    'update_working_hours.execute': { paramsTuple: [ParamValue]; params: {'agendaId': ParamValue} }
    'create_schedule_day.render': { paramsTuple?: []; params?: {} }
    'create_schedule_day.execute': { paramsTuple?: []; params?: {} }
    'update_schedule_day.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_schedule_day.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'delete_schedule_day.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'get_bookable_days.render': { paramsTuple?: []; params?: {} }
    'get_bookable_slots.render': { paramsTuple?: []; params?: {} }
    'search.render': { paramsTuple?: []; params?: {} }
    'list_pets.render': { paramsTuple?: []; params?: {} }
    'create_pet.render': { paramsTuple?: []; params?: {} }
    'create_pet.execute': { paramsTuple?: []; params?: {} }
    'get_pet.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_pet.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_pet.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'event_stream': { paramsTuple?: []; params?: {} }
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'dashboard.render': { paramsTuple?: []; params?: {} }
    'settings': { paramsTuple?: []; params?: {} }
    'signup.render': { paramsTuple?: []; params?: {} }
    'login.render': { paramsTuple?: []; params?: {} }
    'list_agendas.render': { paramsTuple?: []; params?: {} }
    'create_agenda.render': { paramsTuple?: []; params?: {} }
    'update_agenda.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_appointment_types.render': { paramsTuple?: []; params?: {} }
    'create_appointment_type.render': { paramsTuple?: []; params?: {} }
    'update_appointment_type.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_appointment_statuses.render': { paramsTuple?: []; params?: {} }
    'create_appointment_status.render': { paramsTuple?: []; params?: {} }
    'update_appointment_status.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_clients.render': { paramsTuple?: []; params?: {} }
    'create_client.render': { paramsTuple?: []; params?: {} }
    'update_client.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'get_client.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_clients.api': { paramsTuple?: []; params?: {} }
    'get_client.api': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_tenant.render': { paramsTuple?: []; params?: {} }
    'book_appointment.render': { paramsTuple: [ParamValue]; params: {'tenantId': ParamValue} }
    'confirm_appointment.render': { paramsTuple: [ParamValue,ParamValue]; params: {'tenantId': ParamValue,'appointmentId': ParamValue} }
    'show_calendar.render': { paramsTuple?: []; params?: {} }
    'booking_link.render': { paramsTuple?: []; params?: {} }
    'create_appointment.render': { paramsTuple?: []; params?: {} }
    'update_appointment.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_shifts.render': { paramsTuple?: []; params?: {} }
    'create_closed_date.render': { paramsTuple?: []; params?: {} }
    'update_closed_date.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'create_time_off.render': { paramsTuple?: []; params?: {} }
    'update_time_off.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_working_hours.render': { paramsTuple: [ParamValue]; params: {'agendaId': ParamValue} }
    'create_schedule_day.render': { paramsTuple?: []; params?: {} }
    'update_schedule_day.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'get_bookable_days.render': { paramsTuple?: []; params?: {} }
    'get_bookable_slots.render': { paramsTuple?: []; params?: {} }
    'search.render': { paramsTuple?: []; params?: {} }
    'list_pets.render': { paramsTuple?: []; params?: {} }
    'create_pet.render': { paramsTuple?: []; params?: {} }
    'get_pet.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_pet.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'event_stream': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'dashboard.render': { paramsTuple?: []; params?: {} }
    'settings': { paramsTuple?: []; params?: {} }
    'signup.render': { paramsTuple?: []; params?: {} }
    'login.render': { paramsTuple?: []; params?: {} }
    'list_agendas.render': { paramsTuple?: []; params?: {} }
    'create_agenda.render': { paramsTuple?: []; params?: {} }
    'update_agenda.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_appointment_types.render': { paramsTuple?: []; params?: {} }
    'create_appointment_type.render': { paramsTuple?: []; params?: {} }
    'update_appointment_type.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_appointment_statuses.render': { paramsTuple?: []; params?: {} }
    'create_appointment_status.render': { paramsTuple?: []; params?: {} }
    'update_appointment_status.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_clients.render': { paramsTuple?: []; params?: {} }
    'create_client.render': { paramsTuple?: []; params?: {} }
    'update_client.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'get_client.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_clients.api': { paramsTuple?: []; params?: {} }
    'get_client.api': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_tenant.render': { paramsTuple?: []; params?: {} }
    'book_appointment.render': { paramsTuple: [ParamValue]; params: {'tenantId': ParamValue} }
    'confirm_appointment.render': { paramsTuple: [ParamValue,ParamValue]; params: {'tenantId': ParamValue,'appointmentId': ParamValue} }
    'show_calendar.render': { paramsTuple?: []; params?: {} }
    'booking_link.render': { paramsTuple?: []; params?: {} }
    'create_appointment.render': { paramsTuple?: []; params?: {} }
    'update_appointment.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_shifts.render': { paramsTuple?: []; params?: {} }
    'create_closed_date.render': { paramsTuple?: []; params?: {} }
    'update_closed_date.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'create_time_off.render': { paramsTuple?: []; params?: {} }
    'update_time_off.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_working_hours.render': { paramsTuple: [ParamValue]; params: {'agendaId': ParamValue} }
    'create_schedule_day.render': { paramsTuple?: []; params?: {} }
    'update_schedule_day.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'get_bookable_days.render': { paramsTuple?: []; params?: {} }
    'get_bookable_slots.render': { paramsTuple?: []; params?: {} }
    'search.render': { paramsTuple?: []; params?: {} }
    'list_pets.render': { paramsTuple?: []; params?: {} }
    'create_pet.render': { paramsTuple?: []; params?: {} }
    'get_pet.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_pet.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'event_stream': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'signup.execute': { paramsTuple?: []; params?: {} }
    'login.execute': { paramsTuple?: []; params?: {} }
    'logout.execute': { paramsTuple?: []; params?: {} }
    'create_agenda.execute': { paramsTuple?: []; params?: {} }
    'create_appointment_type.execute': { paramsTuple?: []; params?: {} }
    'create_appointment_status.execute': { paramsTuple?: []; params?: {} }
    'move_appointment_status.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'create_client.execute': { paramsTuple?: []; params?: {} }
    'book_appointment.execute': { paramsTuple: [ParamValue]; params: {'tenantId': ParamValue} }
    'create_appointment.execute': { paramsTuple?: []; params?: {} }
    'create_closed_date.execute': { paramsTuple?: []; params?: {} }
    'create_time_off.execute': { paramsTuple?: []; params?: {} }
    'create_schedule_day.execute': { paramsTuple?: []; params?: {} }
    'create_pet.execute': { paramsTuple?: []; params?: {} }
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'update_agenda.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_appointment_type.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_appointment_status.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_client.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_tenant.execute': { paramsTuple?: []; params?: {} }
    'update_appointment.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_closed_date.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_time_off.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_working_hours.execute': { paramsTuple: [ParamValue]; params: {'agendaId': ParamValue} }
    'update_schedule_day.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_pet.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'delete_appointment_status.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'delete_client.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'delete_closed_date.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'delete_time_off.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'delete_schedule_day.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'change_appointment_status.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}