/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'dashboard.render': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard',
    tokens: [{"old":"/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['dashboard.render']['types'],
  },
  'settings': {
    methods: ["GET","HEAD"],
    pattern: '/settings',
    tokens: [{"old":"/settings","type":0,"val":"settings","end":""}],
    types: placeholder as Registry['settings']['types'],
  },
  'signup.render': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['signup.render']['types'],
  },
  'signup.execute': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['signup.execute']['types'],
  },
  'login.render': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['login.render']['types'],
  },
  'login.execute': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['login.execute']['types'],
  },
  'logout.execute': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['logout.execute']['types'],
  },
  'list_agendas.render': {
    methods: ["GET","HEAD"],
    pattern: '/agendas',
    tokens: [{"old":"/agendas","type":0,"val":"agendas","end":""}],
    types: placeholder as Registry['list_agendas.render']['types'],
  },
  'create_agenda.render': {
    methods: ["GET","HEAD"],
    pattern: '/agendas/new',
    tokens: [{"old":"/agendas/new","type":0,"val":"agendas","end":""},{"old":"/agendas/new","type":0,"val":"new","end":""}],
    types: placeholder as Registry['create_agenda.render']['types'],
  },
  'create_agenda.execute': {
    methods: ["POST"],
    pattern: '/agendas',
    tokens: [{"old":"/agendas","type":0,"val":"agendas","end":""}],
    types: placeholder as Registry['create_agenda.execute']['types'],
  },
  'update_agenda.render': {
    methods: ["GET","HEAD"],
    pattern: '/agendas/edit/:id',
    tokens: [{"old":"/agendas/edit/:id","type":0,"val":"agendas","end":""},{"old":"/agendas/edit/:id","type":0,"val":"edit","end":""},{"old":"/agendas/edit/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['update_agenda.render']['types'],
  },
  'update_agenda.execute': {
    methods: ["PUT"],
    pattern: '/agendas/:id',
    tokens: [{"old":"/agendas/:id","type":0,"val":"agendas","end":""},{"old":"/agendas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['update_agenda.execute']['types'],
  },
  'list_appointment_types.render': {
    methods: ["GET","HEAD"],
    pattern: '/appointment-types',
    tokens: [{"old":"/appointment-types","type":0,"val":"appointment-types","end":""}],
    types: placeholder as Registry['list_appointment_types.render']['types'],
  },
  'create_appointment_type.render': {
    methods: ["GET","HEAD"],
    pattern: '/appointment-types/new',
    tokens: [{"old":"/appointment-types/new","type":0,"val":"appointment-types","end":""},{"old":"/appointment-types/new","type":0,"val":"new","end":""}],
    types: placeholder as Registry['create_appointment_type.render']['types'],
  },
  'create_appointment_type.execute': {
    methods: ["POST"],
    pattern: '/appointment-types',
    tokens: [{"old":"/appointment-types","type":0,"val":"appointment-types","end":""}],
    types: placeholder as Registry['create_appointment_type.execute']['types'],
  },
  'update_appointment_type.render': {
    methods: ["GET","HEAD"],
    pattern: '/appointment-types/edit/:id',
    tokens: [{"old":"/appointment-types/edit/:id","type":0,"val":"appointment-types","end":""},{"old":"/appointment-types/edit/:id","type":0,"val":"edit","end":""},{"old":"/appointment-types/edit/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['update_appointment_type.render']['types'],
  },
  'update_appointment_type.execute': {
    methods: ["PUT"],
    pattern: '/appointment-types/:id',
    tokens: [{"old":"/appointment-types/:id","type":0,"val":"appointment-types","end":""},{"old":"/appointment-types/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['update_appointment_type.execute']['types'],
  },
  'list_appointment_statuses.render': {
    methods: ["GET","HEAD"],
    pattern: '/settings/statuses',
    tokens: [{"old":"/settings/statuses","type":0,"val":"settings","end":""},{"old":"/settings/statuses","type":0,"val":"statuses","end":""}],
    types: placeholder as Registry['list_appointment_statuses.render']['types'],
  },
  'create_appointment_status.render': {
    methods: ["GET","HEAD"],
    pattern: '/settings/statuses/new',
    tokens: [{"old":"/settings/statuses/new","type":0,"val":"settings","end":""},{"old":"/settings/statuses/new","type":0,"val":"statuses","end":""},{"old":"/settings/statuses/new","type":0,"val":"new","end":""}],
    types: placeholder as Registry['create_appointment_status.render']['types'],
  },
  'create_appointment_status.execute': {
    methods: ["POST"],
    pattern: '/settings/statuses',
    tokens: [{"old":"/settings/statuses","type":0,"val":"settings","end":""},{"old":"/settings/statuses","type":0,"val":"statuses","end":""}],
    types: placeholder as Registry['create_appointment_status.execute']['types'],
  },
  'update_appointment_status.render': {
    methods: ["GET","HEAD"],
    pattern: '/settings/statuses/:id/edit',
    tokens: [{"old":"/settings/statuses/:id/edit","type":0,"val":"settings","end":""},{"old":"/settings/statuses/:id/edit","type":0,"val":"statuses","end":""},{"old":"/settings/statuses/:id/edit","type":1,"val":"id","end":""},{"old":"/settings/statuses/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['update_appointment_status.render']['types'],
  },
  'update_appointment_status.execute': {
    methods: ["PUT"],
    pattern: '/settings/statuses/:id',
    tokens: [{"old":"/settings/statuses/:id","type":0,"val":"settings","end":""},{"old":"/settings/statuses/:id","type":0,"val":"statuses","end":""},{"old":"/settings/statuses/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['update_appointment_status.execute']['types'],
  },
  'move_appointment_status.execute': {
    methods: ["POST"],
    pattern: '/settings/statuses/:id/move',
    tokens: [{"old":"/settings/statuses/:id/move","type":0,"val":"settings","end":""},{"old":"/settings/statuses/:id/move","type":0,"val":"statuses","end":""},{"old":"/settings/statuses/:id/move","type":1,"val":"id","end":""},{"old":"/settings/statuses/:id/move","type":0,"val":"move","end":""}],
    types: placeholder as Registry['move_appointment_status.execute']['types'],
  },
  'delete_appointment_status.execute': {
    methods: ["DELETE"],
    pattern: '/settings/statuses/:id',
    tokens: [{"old":"/settings/statuses/:id","type":0,"val":"settings","end":""},{"old":"/settings/statuses/:id","type":0,"val":"statuses","end":""},{"old":"/settings/statuses/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['delete_appointment_status.execute']['types'],
  },
  'list_patients.render': {
    methods: ["GET","HEAD"],
    pattern: '/patients',
    tokens: [{"old":"/patients","type":0,"val":"patients","end":""}],
    types: placeholder as Registry['list_patients.render']['types'],
  },
  'create_patient.render': {
    methods: ["GET","HEAD"],
    pattern: '/patients/new',
    tokens: [{"old":"/patients/new","type":0,"val":"patients","end":""},{"old":"/patients/new","type":0,"val":"new","end":""}],
    types: placeholder as Registry['create_patient.render']['types'],
  },
  'create_patient.execute': {
    methods: ["POST"],
    pattern: '/patients',
    tokens: [{"old":"/patients","type":0,"val":"patients","end":""}],
    types: placeholder as Registry['create_patient.execute']['types'],
  },
  'update_patient.render': {
    methods: ["GET","HEAD"],
    pattern: '/patients/edit/:id',
    tokens: [{"old":"/patients/edit/:id","type":0,"val":"patients","end":""},{"old":"/patients/edit/:id","type":0,"val":"edit","end":""},{"old":"/patients/edit/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['update_patient.render']['types'],
  },
  'get_patient.render': {
    methods: ["GET","HEAD"],
    pattern: '/patients/:id',
    tokens: [{"old":"/patients/:id","type":0,"val":"patients","end":""},{"old":"/patients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['get_patient.render']['types'],
  },
  'update_patient.execute': {
    methods: ["PUT"],
    pattern: '/patients/:id',
    tokens: [{"old":"/patients/:id","type":0,"val":"patients","end":""},{"old":"/patients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['update_patient.execute']['types'],
  },
  'delete_patient.execute': {
    methods: ["DELETE"],
    pattern: '/patients/:id',
    tokens: [{"old":"/patients/:id","type":0,"val":"patients","end":""},{"old":"/patients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['delete_patient.execute']['types'],
  },
  'list_patients.api': {
    methods: ["GET","HEAD"],
    pattern: '/api/patients',
    tokens: [{"old":"/api/patients","type":0,"val":"api","end":""},{"old":"/api/patients","type":0,"val":"patients","end":""}],
    types: placeholder as Registry['list_patients.api']['types'],
  },
  'get_patient.api': {
    methods: ["GET","HEAD"],
    pattern: '/api/patients/:id',
    tokens: [{"old":"/api/patients/:id","type":0,"val":"api","end":""},{"old":"/api/patients/:id","type":0,"val":"patients","end":""},{"old":"/api/patients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['get_patient.api']['types'],
  },
  'update_tenant.render': {
    methods: ["GET","HEAD"],
    pattern: '/tenant/edit',
    tokens: [{"old":"/tenant/edit","type":0,"val":"tenant","end":""},{"old":"/tenant/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['update_tenant.render']['types'],
  },
  'update_tenant.execute': {
    methods: ["PUT"],
    pattern: '/tenant',
    tokens: [{"old":"/tenant","type":0,"val":"tenant","end":""}],
    types: placeholder as Registry['update_tenant.execute']['types'],
  },
  'book_appointment.render': {
    methods: ["GET","HEAD"],
    pattern: '/:tenantId/booking',
    tokens: [{"old":"/:tenantId/booking","type":1,"val":"tenantId","end":""},{"old":"/:tenantId/booking","type":0,"val":"booking","end":""}],
    types: placeholder as Registry['book_appointment.render']['types'],
  },
  'book_appointment.execute': {
    methods: ["POST"],
    pattern: '/:tenantId/booking',
    tokens: [{"old":"/:tenantId/booking","type":1,"val":"tenantId","end":""},{"old":"/:tenantId/booking","type":0,"val":"booking","end":""}],
    types: placeholder as Registry['book_appointment.execute']['types'],
  },
  'confirm_appointment.render': {
    methods: ["GET","HEAD"],
    pattern: '/:tenantId/booking/:appointmentId/confirm',
    tokens: [{"old":"/:tenantId/booking/:appointmentId/confirm","type":1,"val":"tenantId","end":""},{"old":"/:tenantId/booking/:appointmentId/confirm","type":0,"val":"booking","end":""},{"old":"/:tenantId/booking/:appointmentId/confirm","type":1,"val":"appointmentId","end":""},{"old":"/:tenantId/booking/:appointmentId/confirm","type":0,"val":"confirm","end":""}],
    types: placeholder as Registry['confirm_appointment.render']['types'],
  },
  'show_calendar.render': {
    methods: ["GET","HEAD"],
    pattern: '/calendar',
    tokens: [{"old":"/calendar","type":0,"val":"calendar","end":""}],
    types: placeholder as Registry['show_calendar.render']['types'],
  },
  'booking_link.render': {
    methods: ["GET","HEAD"],
    pattern: '/settings/booking-link',
    tokens: [{"old":"/settings/booking-link","type":0,"val":"settings","end":""},{"old":"/settings/booking-link","type":0,"val":"booking-link","end":""}],
    types: placeholder as Registry['booking_link.render']['types'],
  },
  'create_appointment.render': {
    methods: ["GET","HEAD"],
    pattern: '/appointments/new',
    tokens: [{"old":"/appointments/new","type":0,"val":"appointments","end":""},{"old":"/appointments/new","type":0,"val":"new","end":""}],
    types: placeholder as Registry['create_appointment.render']['types'],
  },
  'create_appointment.execute': {
    methods: ["POST"],
    pattern: '/appointments',
    tokens: [{"old":"/appointments","type":0,"val":"appointments","end":""}],
    types: placeholder as Registry['create_appointment.execute']['types'],
  },
  'update_appointment.render': {
    methods: ["GET","HEAD"],
    pattern: '/appointments/edit/:id',
    tokens: [{"old":"/appointments/edit/:id","type":0,"val":"appointments","end":""},{"old":"/appointments/edit/:id","type":0,"val":"edit","end":""},{"old":"/appointments/edit/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['update_appointment.render']['types'],
  },
  'update_appointment.execute': {
    methods: ["PUT"],
    pattern: '/appointments/:id',
    tokens: [{"old":"/appointments/:id","type":0,"val":"appointments","end":""},{"old":"/appointments/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['update_appointment.execute']['types'],
  },
  'change_appointment_status.execute': {
    methods: ["PATCH"],
    pattern: '/appointments/:id/status',
    tokens: [{"old":"/appointments/:id/status","type":0,"val":"appointments","end":""},{"old":"/appointments/:id/status","type":1,"val":"id","end":""},{"old":"/appointments/:id/status","type":0,"val":"status","end":""}],
    types: placeholder as Registry['change_appointment_status.execute']['types'],
  },
  'list_shifts.render': {
    methods: ["GET","HEAD"],
    pattern: '/shifts',
    tokens: [{"old":"/shifts","type":0,"val":"shifts","end":""}],
    types: placeholder as Registry['list_shifts.render']['types'],
  },
  'create_closed_date.render': {
    methods: ["GET","HEAD"],
    pattern: '/closed-dates/new',
    tokens: [{"old":"/closed-dates/new","type":0,"val":"closed-dates","end":""},{"old":"/closed-dates/new","type":0,"val":"new","end":""}],
    types: placeholder as Registry['create_closed_date.render']['types'],
  },
  'create_closed_date.execute': {
    methods: ["POST"],
    pattern: '/closed-dates',
    tokens: [{"old":"/closed-dates","type":0,"val":"closed-dates","end":""}],
    types: placeholder as Registry['create_closed_date.execute']['types'],
  },
  'update_closed_date.render': {
    methods: ["GET","HEAD"],
    pattern: '/closed-dates/edit/:id',
    tokens: [{"old":"/closed-dates/edit/:id","type":0,"val":"closed-dates","end":""},{"old":"/closed-dates/edit/:id","type":0,"val":"edit","end":""},{"old":"/closed-dates/edit/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['update_closed_date.render']['types'],
  },
  'update_closed_date.execute': {
    methods: ["PUT"],
    pattern: '/closed-dates/:id',
    tokens: [{"old":"/closed-dates/:id","type":0,"val":"closed-dates","end":""},{"old":"/closed-dates/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['update_closed_date.execute']['types'],
  },
  'delete_closed_date.execute': {
    methods: ["DELETE"],
    pattern: '/closed-dates/:id',
    tokens: [{"old":"/closed-dates/:id","type":0,"val":"closed-dates","end":""},{"old":"/closed-dates/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['delete_closed_date.execute']['types'],
  },
  'create_time_off.render': {
    methods: ["GET","HEAD"],
    pattern: '/time-offs/new',
    tokens: [{"old":"/time-offs/new","type":0,"val":"time-offs","end":""},{"old":"/time-offs/new","type":0,"val":"new","end":""}],
    types: placeholder as Registry['create_time_off.render']['types'],
  },
  'create_time_off.execute': {
    methods: ["POST"],
    pattern: '/time-offs',
    tokens: [{"old":"/time-offs","type":0,"val":"time-offs","end":""}],
    types: placeholder as Registry['create_time_off.execute']['types'],
  },
  'update_time_off.render': {
    methods: ["GET","HEAD"],
    pattern: '/time-offs/edit/:id',
    tokens: [{"old":"/time-offs/edit/:id","type":0,"val":"time-offs","end":""},{"old":"/time-offs/edit/:id","type":0,"val":"edit","end":""},{"old":"/time-offs/edit/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['update_time_off.render']['types'],
  },
  'update_time_off.execute': {
    methods: ["PUT"],
    pattern: '/time-offs/:id',
    tokens: [{"old":"/time-offs/:id","type":0,"val":"time-offs","end":""},{"old":"/time-offs/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['update_time_off.execute']['types'],
  },
  'delete_time_off.execute': {
    methods: ["DELETE"],
    pattern: '/time-offs/:id',
    tokens: [{"old":"/time-offs/:id","type":0,"val":"time-offs","end":""},{"old":"/time-offs/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['delete_time_off.execute']['types'],
  },
  'update_working_hours.render': {
    methods: ["GET","HEAD"],
    pattern: '/working-hours/:agendaId',
    tokens: [{"old":"/working-hours/:agendaId","type":0,"val":"working-hours","end":""},{"old":"/working-hours/:agendaId","type":1,"val":"agendaId","end":""}],
    types: placeholder as Registry['update_working_hours.render']['types'],
  },
  'update_working_hours.execute': {
    methods: ["PUT"],
    pattern: '/working-hours/:agendaId',
    tokens: [{"old":"/working-hours/:agendaId","type":0,"val":"working-hours","end":""},{"old":"/working-hours/:agendaId","type":1,"val":"agendaId","end":""}],
    types: placeholder as Registry['update_working_hours.execute']['types'],
  },
  'get_bookable_days.render': {
    methods: ["GET","HEAD"],
    pattern: '/api/bookable-days',
    tokens: [{"old":"/api/bookable-days","type":0,"val":"api","end":""},{"old":"/api/bookable-days","type":0,"val":"bookable-days","end":""}],
    types: placeholder as Registry['get_bookable_days.render']['types'],
  },
  'get_bookable_slots.render': {
    methods: ["GET","HEAD"],
    pattern: '/api/bookable-slots',
    tokens: [{"old":"/api/bookable-slots","type":0,"val":"api","end":""},{"old":"/api/bookable-slots","type":0,"val":"bookable-slots","end":""}],
    types: placeholder as Registry['get_bookable_slots.render']['types'],
  },
  'search.render': {
    methods: ["GET","HEAD"],
    pattern: '/search',
    tokens: [{"old":"/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['search.render']['types'],
  },
  'event_stream': {
    methods: ["GET","HEAD"],
    pattern: '/__transmit/events',
    tokens: [{"old":"/__transmit/events","type":0,"val":"__transmit","end":""},{"old":"/__transmit/events","type":0,"val":"events","end":""}],
    types: placeholder as Registry['event_stream']['types'],
  },
  'subscribe': {
    methods: ["POST"],
    pattern: '/__transmit/subscribe',
    tokens: [{"old":"/__transmit/subscribe","type":0,"val":"__transmit","end":""},{"old":"/__transmit/subscribe","type":0,"val":"subscribe","end":""}],
    types: placeholder as Registry['subscribe']['types'],
  },
  'unsubscribe': {
    methods: ["POST"],
    pattern: '/__transmit/unsubscribe',
    tokens: [{"old":"/__transmit/unsubscribe","type":0,"val":"__transmit","end":""},{"old":"/__transmit/unsubscribe","type":0,"val":"unsubscribe","end":""}],
    types: placeholder as Registry['unsubscribe']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
