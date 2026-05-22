/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard',
    tokens: [{"old":"/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['dashboard']['types'],
  },
  'settings': {
    methods: ["GET","HEAD"],
    pattern: '/settings',
    tokens: [{"old":"/settings","type":0,"val":"settings","end":""}],
    types: placeholder as Registry['settings']['types'],
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
  'show_calendar.render': {
    methods: ["GET","HEAD"],
    pattern: '/calendar',
    tokens: [{"old":"/calendar","type":0,"val":"calendar","end":""}],
    types: placeholder as Registry['show_calendar.render']['types'],
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
