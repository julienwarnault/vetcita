/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'dashboard': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'settings': {
    methods: ["GET","HEAD"]
    pattern: '/settings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'login.render': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/identity/controllers/login_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/identity/controllers/login_controller').default['render']>>>
    }
  }
  'login.execute': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/identity/controllers/login_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/identity/controllers/login_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/identity/controllers/login_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/identity/controllers/login_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'logout.execute': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/identity/controllers/logout_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/identity/controllers/logout_controller').default['execute']>>>
    }
  }
  'list_agendas.render': {
    methods: ["GET","HEAD"]
    pattern: '/agendas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/agendas/controllers/list_agendas_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/agendas/controllers/list_agendas_controller').default['render']>>>
    }
  }
  'create_agenda.render': {
    methods: ["GET","HEAD"]
    pattern: '/agendas/new'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/agendas/controllers/create_agenda_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/agendas/controllers/create_agenda_controller').default['render']>>>
    }
  }
  'create_agenda.execute': {
    methods: ["POST"]
    pattern: '/agendas'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/agendas/controllers/create_agenda_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/agendas/controllers/create_agenda_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/agendas/controllers/create_agenda_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/agendas/controllers/create_agenda_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'update_agenda.render': {
    methods: ["GET","HEAD"]
    pattern: '/agendas/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/agendas/controllers/update_agenda_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/agendas/controllers/update_agenda_controller').default['render']>>>
    }
  }
  'update_agenda.execute': {
    methods: ["PUT"]
    pattern: '/agendas/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/agendas/controllers/update_agenda_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/agendas/controllers/update_agenda_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/agendas/controllers/update_agenda_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/agendas/controllers/update_agenda_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'list_appointment_types.render': {
    methods: ["GET","HEAD"]
    pattern: '/appointment-types'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/appointment_types/controllers/list_appointment_types_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/appointment_types/controllers/list_appointment_types_controller').default['render']>>>
    }
  }
  'create_appointment_type.render': {
    methods: ["GET","HEAD"]
    pattern: '/appointment-types/new'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/appointment_types/controllers/create_appointment_type_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/appointment_types/controllers/create_appointment_type_controller').default['render']>>>
    }
  }
  'create_appointment_type.execute': {
    methods: ["POST"]
    pattern: '/appointment-types'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/appointment_types/controllers/create_appointment_type_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/appointment_types/controllers/create_appointment_type_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/appointment_types/controllers/create_appointment_type_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/appointment_types/controllers/create_appointment_type_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'update_appointment_type.render': {
    methods: ["GET","HEAD"]
    pattern: '/appointment-types/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/appointment_types/controllers/update_appointment_type_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/appointment_types/controllers/update_appointment_type_controller').default['render']>>>
    }
  }
  'update_appointment_type.execute': {
    methods: ["PUT"]
    pattern: '/appointment-types/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/appointment_types/controllers/update_appointment_type_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/appointment_types/controllers/update_appointment_type_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/appointment_types/controllers/update_appointment_type_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/appointment_types/controllers/update_appointment_type_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'list_patients.render': {
    methods: ["GET","HEAD"]
    pattern: '/patients'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/patients/controllers/list_patients_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/patients/controllers/list_patients_controller').default['render']>>>
    }
  }
  'create_patient.render': {
    methods: ["GET","HEAD"]
    pattern: '/patients/new'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/patients/controllers/create_patient_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/patients/controllers/create_patient_controller').default['render']>>>
    }
  }
  'create_patient.execute': {
    methods: ["POST"]
    pattern: '/patients'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/patients/controllers/create_patient_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/patients/controllers/create_patient_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/patients/controllers/create_patient_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/patients/controllers/create_patient_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'update_patient.render': {
    methods: ["GET","HEAD"]
    pattern: '/patients/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/patients/controllers/update_patient_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/patients/controllers/update_patient_controller').default['render']>>>
    }
  }
  'update_patient.execute': {
    methods: ["PUT"]
    pattern: '/patients/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/patients/controllers/update_patient_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/patients/controllers/update_patient_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/patients/controllers/update_patient_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/patients/controllers/update_patient_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'delete_patient.execute': {
    methods: ["DELETE"]
    pattern: '/patients/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/patients/controllers/delete_patient_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/patients/controllers/delete_patient_controller').default['execute']>>>
    }
  }
  'show_calendar.render': {
    methods: ["GET","HEAD"]
    pattern: '/calendar'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#app/calendar/controllers/show_calendar_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/calendar/controllers/show_calendar_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/calendar/controllers/show_calendar_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'update_tenant.render': {
    methods: ["GET","HEAD"]
    pattern: '/tenant/edit'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/tenants/controllers/update_tenant_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/tenants/controllers/update_tenant_controller').default['render']>>>
    }
  }
  'update_tenant.execute': {
    methods: ["PUT"]
    pattern: '/tenant'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/tenants/controllers/update_tenant_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/tenants/controllers/update_tenant_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/tenants/controllers/update_tenant_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/tenants/controllers/update_tenant_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'patient_booking.render': {
    methods: ["GET","HEAD"]
    pattern: '/:tenantId/booking'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { tenantId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/booking/controllers/patient_booking_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/booking/controllers/patient_booking_controller').default['render']>>>
    }
  }
  'booking_link.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/booling-link'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/booking/controllers/booking_link_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/booking/controllers/booking_link_controller').default['render']>>>
    }
  }
}
