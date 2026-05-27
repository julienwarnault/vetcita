import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'get_month_availability.render': { paramsTuple?: []; params?: {} }
    'get_available_slots.render': { paramsTuple?: []; params?: {} }
    'get_next_available_slot.render': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'settings': { paramsTuple?: []; params?: {} }
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
    'list_patients.render': { paramsTuple?: []; params?: {} }
    'create_patient.render': { paramsTuple?: []; params?: {} }
    'create_patient.execute': { paramsTuple?: []; params?: {} }
    'update_patient.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_patient.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'delete_patient.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_tenant.render': { paramsTuple?: []; params?: {} }
    'update_tenant.execute': { paramsTuple?: []; params?: {} }
    'book_appointment.render': { paramsTuple: [ParamValue]; params: {'tenantId': ParamValue} }
    'book_appointment.execute': { paramsTuple: [ParamValue]; params: {'tenantId': ParamValue} }
    'confirm_appointment.render': { paramsTuple: [ParamValue]; params: {'appointmentId': ParamValue} }
    'show_calendar.render': { paramsTuple?: []; params?: {} }
    'booking_link.render': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'get_month_availability.render': { paramsTuple?: []; params?: {} }
    'get_available_slots.render': { paramsTuple?: []; params?: {} }
    'get_next_available_slot.render': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'settings': { paramsTuple?: []; params?: {} }
    'login.render': { paramsTuple?: []; params?: {} }
    'list_agendas.render': { paramsTuple?: []; params?: {} }
    'create_agenda.render': { paramsTuple?: []; params?: {} }
    'update_agenda.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_appointment_types.render': { paramsTuple?: []; params?: {} }
    'create_appointment_type.render': { paramsTuple?: []; params?: {} }
    'update_appointment_type.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_patients.render': { paramsTuple?: []; params?: {} }
    'create_patient.render': { paramsTuple?: []; params?: {} }
    'update_patient.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_tenant.render': { paramsTuple?: []; params?: {} }
    'book_appointment.render': { paramsTuple: [ParamValue]; params: {'tenantId': ParamValue} }
    'confirm_appointment.render': { paramsTuple: [ParamValue]; params: {'appointmentId': ParamValue} }
    'show_calendar.render': { paramsTuple?: []; params?: {} }
    'booking_link.render': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'get_month_availability.render': { paramsTuple?: []; params?: {} }
    'get_available_slots.render': { paramsTuple?: []; params?: {} }
    'get_next_available_slot.render': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'settings': { paramsTuple?: []; params?: {} }
    'login.render': { paramsTuple?: []; params?: {} }
    'list_agendas.render': { paramsTuple?: []; params?: {} }
    'create_agenda.render': { paramsTuple?: []; params?: {} }
    'update_agenda.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_appointment_types.render': { paramsTuple?: []; params?: {} }
    'create_appointment_type.render': { paramsTuple?: []; params?: {} }
    'update_appointment_type.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'list_patients.render': { paramsTuple?: []; params?: {} }
    'create_patient.render': { paramsTuple?: []; params?: {} }
    'update_patient.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_tenant.render': { paramsTuple?: []; params?: {} }
    'book_appointment.render': { paramsTuple: [ParamValue]; params: {'tenantId': ParamValue} }
    'confirm_appointment.render': { paramsTuple: [ParamValue]; params: {'appointmentId': ParamValue} }
    'show_calendar.render': { paramsTuple?: []; params?: {} }
    'booking_link.render': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'login.execute': { paramsTuple?: []; params?: {} }
    'logout.execute': { paramsTuple?: []; params?: {} }
    'create_agenda.execute': { paramsTuple?: []; params?: {} }
    'create_appointment_type.execute': { paramsTuple?: []; params?: {} }
    'create_patient.execute': { paramsTuple?: []; params?: {} }
    'book_appointment.execute': { paramsTuple: [ParamValue]; params: {'tenantId': ParamValue} }
  }
  PUT: {
    'update_agenda.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_appointment_type.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_patient.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_tenant.execute': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'delete_patient.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}