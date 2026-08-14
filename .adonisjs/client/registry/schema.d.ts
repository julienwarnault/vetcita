/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'dashboard.render': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/shared/controllers/dashboard_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/shared/controllers/dashboard_controller').default['render']>>>
    }
  }
  'show_settings.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/shared/controllers/show_settings_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/shared/controllers/show_settings_controller').default['render']>>>
    }
  }
  'signup.render': {
    methods: ["GET","HEAD"]
    pattern: '/signup'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/identity/controllers/signup_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/identity/controllers/signup_controller').default['render']>>>
    }
  }
  'signup.execute': {
    methods: ["POST"]
    pattern: '/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/identity/controllers/signup_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/identity/controllers/signup_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/identity/controllers/signup_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/identity/controllers/signup_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
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
  'forgot_password.render': {
    methods: ["GET","HEAD"]
    pattern: '/forgot-password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/identity/controllers/forgot_password_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/identity/controllers/forgot_password_controller').default['render']>>>
    }
  }
  'forgot_password.execute': {
    methods: ["POST"]
    pattern: '/forgot-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/identity/controllers/forgot_password_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/identity/controllers/forgot_password_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/identity/controllers/forgot_password_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/identity/controllers/forgot_password_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'reset_password.render': {
    methods: ["GET","HEAD"]
    pattern: '/reset-password/:token'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { token: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/identity/controllers/reset_password_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/identity/controllers/reset_password_controller').default['render']>>>
    }
  }
  'reset_password.execute': {
    methods: ["POST"]
    pattern: '/reset-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/identity/controllers/reset_password_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/identity/controllers/reset_password_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/identity/controllers/reset_password_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/identity/controllers/reset_password_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
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
    pattern: '/settings/agendas'
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
    pattern: '/settings/agendas/new'
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
    pattern: '/settings/agendas'
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
    pattern: '/settings/agendas/edit/:id'
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
    pattern: '/settings/agendas/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/agendas/controllers/update_agenda_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/agendas/controllers/update_agenda_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/agendas/controllers/update_agenda_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/agendas/controllers/update_agenda_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'delete_agenda.execute': {
    methods: ["DELETE"]
    pattern: '/settings/agendas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/agendas/controllers/delete_agenda_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/agendas/controllers/delete_agenda_controller').default['execute']>>>
    }
  }
  'list_services.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/services'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/services/controllers/list_services_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/services/controllers/list_services_controller').default['render']>>>
    }
  }
  'create_service.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/services/new'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/services/controllers/create_service_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/services/controllers/create_service_controller').default['render']>>>
    }
  }
  'create_service.execute': {
    methods: ["POST"]
    pattern: '/settings/services'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/services/controllers/create_service_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/services/controllers/create_service_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/services/controllers/create_service_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/services/controllers/create_service_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'update_service.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/services/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/services/controllers/update_service_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/services/controllers/update_service_controller').default['render']>>>
    }
  }
  'update_service.execute': {
    methods: ["PUT"]
    pattern: '/settings/services/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/services/controllers/update_service_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/services/controllers/update_service_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/services/controllers/update_service_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/services/controllers/update_service_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'delete_service.execute': {
    methods: ["DELETE"]
    pattern: '/settings/services/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/services/controllers/delete_service_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/services/controllers/delete_service_controller').default['execute']>>>
    }
  }
  'list_appointment_statuses.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/statuses'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/appointment_workflow/controllers/list_appointment_statuses_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/appointment_workflow/controllers/list_appointment_statuses_controller').default['render']>>>
    }
  }
  'create_appointment_status.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/statuses/new'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/appointment_workflow/controllers/create_appointment_status_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/appointment_workflow/controllers/create_appointment_status_controller').default['render']>>>
    }
  }
  'create_appointment_status.execute': {
    methods: ["POST"]
    pattern: '/settings/statuses'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/appointment_workflow/controllers/create_appointment_status_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/appointment_workflow/controllers/create_appointment_status_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/appointment_workflow/controllers/create_appointment_status_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/appointment_workflow/controllers/create_appointment_status_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'update_appointment_status.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/statuses/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/appointment_workflow/controllers/update_appointment_status_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/appointment_workflow/controllers/update_appointment_status_controller').default['render']>>>
    }
  }
  'update_appointment_status.execute': {
    methods: ["PUT"]
    pattern: '/settings/statuses/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/appointment_workflow/controllers/update_appointment_status_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/appointment_workflow/controllers/update_appointment_status_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/appointment_workflow/controllers/update_appointment_status_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/appointment_workflow/controllers/update_appointment_status_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'move_appointment_status.execute': {
    methods: ["POST"]
    pattern: '/settings/statuses/:id/move'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/appointment_workflow/controllers/move_appointment_status_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/appointment_workflow/controllers/move_appointment_status_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/appointment_workflow/controllers/move_appointment_status_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/appointment_workflow/controllers/move_appointment_status_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'delete_appointment_status.execute': {
    methods: ["DELETE"]
    pattern: '/settings/statuses/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/appointment_workflow/controllers/delete_appointment_status_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/appointment_workflow/controllers/delete_appointment_status_controller').default['execute']>>>
    }
  }
  'list_clients.render': {
    methods: ["GET","HEAD"]
    pattern: '/clients'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/clients/controllers/list_clients_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/clients/controllers/list_clients_controller').default['render']>>>
    }
  }
  'create_client.render': {
    methods: ["GET","HEAD"]
    pattern: '/clients/new'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/clients/controllers/create_client_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/clients/controllers/create_client_controller').default['render']>>>
    }
  }
  'create_client.execute': {
    methods: ["POST"]
    pattern: '/clients'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/clients/controllers/create_client_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/clients/controllers/create_client_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/clients/controllers/create_client_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/clients/controllers/create_client_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'update_client.render': {
    methods: ["GET","HEAD"]
    pattern: '/clients/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/clients/controllers/update_client_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/clients/controllers/update_client_controller').default['render']>>>
    }
  }
  'get_client.render': {
    methods: ["GET","HEAD"]
    pattern: '/clients/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/clients/controllers/get_client_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/clients/controllers/get_client_controller').default['render']>>>
    }
  }
  'update_client.execute': {
    methods: ["PUT"]
    pattern: '/clients/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/clients/controllers/update_client_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/clients/controllers/update_client_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/clients/controllers/update_client_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/clients/controllers/update_client_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'delete_client.execute': {
    methods: ["DELETE"]
    pattern: '/clients/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/clients/controllers/delete_client_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/clients/controllers/delete_client_controller').default['execute']>>>
    }
  }
  'list_clients.api': {
    methods: ["GET","HEAD"]
    pattern: '/api/clients'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/clients/controllers/list_clients_controller').default['api']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/clients/controllers/list_clients_controller').default['api']>>>
    }
  }
  'get_client.api': {
    methods: ["GET","HEAD"]
    pattern: '/api/clients/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/clients/controllers/get_client_controller').default['api']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/clients/controllers/get_client_controller').default['api']>>>
    }
  }
  'show_tenant.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/tenant'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/tenants/controllers/show_tenant_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/tenants/controllers/show_tenant_controller').default['render']>>>
    }
  }
  'update_tenant.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/tenant/edit'
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
    pattern: '/settings/tenant'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/tenants/controllers/update_tenant_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/tenants/controllers/update_tenant_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/tenants/controllers/update_tenant_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/tenants/controllers/update_tenant_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'update_location.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/location/edit'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/tenants/controllers/update_location_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/tenants/controllers/update_location_controller').default['render']>>>
    }
  }
  'update_location.execute': {
    methods: ["PUT"]
    pattern: '/settings/location'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/tenants/controllers/update_location_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/tenants/controllers/update_location_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/tenants/controllers/update_location_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/tenants/controllers/update_location_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'book_appointment.render': {
    methods: ["GET","HEAD"]
    pattern: '/:slug/booking'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/booking/controllers/book_appointment_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/booking/controllers/book_appointment_controller').default['render']>>>
    }
  }
  'book_appointment.execute': {
    methods: ["POST"]
    pattern: '/:slug/booking'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/booking/controllers/book_appointment_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/booking/controllers/book_appointment_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/booking/controllers/book_appointment_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/booking/controllers/book_appointment_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'confirm_appointment.render': {
    methods: ["GET","HEAD"]
    pattern: '/:slug/booking/:appointmentId/confirm'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { slug: ParamValue; appointmentId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/booking/controllers/confirm_appointment_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/booking/controllers/confirm_appointment_controller').default['render']>>>
    }
  }
  'show_calendar.render': {
    methods: ["GET","HEAD"]
    pattern: '/calendar'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#app/booking/controllers/show_calendar_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/booking/controllers/show_calendar_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/booking/controllers/show_calendar_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'create_appointment.render': {
    methods: ["GET","HEAD"]
    pattern: '/appointments/new'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/booking/controllers/create_appointment_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/booking/controllers/create_appointment_controller').default['render']>>>
    }
  }
  'create_appointment.execute': {
    methods: ["POST"]
    pattern: '/appointments'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/booking/controllers/create_appointment_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/booking/controllers/create_appointment_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/booking/controllers/create_appointment_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/booking/controllers/create_appointment_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'update_appointment.render': {
    methods: ["GET","HEAD"]
    pattern: '/appointments/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/booking/controllers/update_appointment_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/booking/controllers/update_appointment_controller').default['render']>>>
    }
  }
  'update_appointment.execute': {
    methods: ["PUT"]
    pattern: '/appointments/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/booking/controllers/update_appointment_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/booking/controllers/update_appointment_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/booking/controllers/update_appointment_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/booking/controllers/update_appointment_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'change_appointment_status.execute': {
    methods: ["PATCH"]
    pattern: '/appointments/:id/status'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/booking/controllers/change_appointment_status_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/booking/controllers/change_appointment_status_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/booking/controllers/change_appointment_status_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/booking/controllers/change_appointment_status_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'booking_link.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/booking-link'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/booking/controllers/booking_link_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/booking/controllers/booking_link_controller').default['render']>>>
    }
  }
  'list_shifts.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/shifts'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#app/scheduling/controllers/list_shifts_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/list_shifts_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/list_shifts_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'create_closed_date.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/closed-dates/new'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/create_closed_date_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/create_closed_date_controller').default['render']>>>
    }
  }
  'create_closed_date.execute': {
    methods: ["POST"]
    pattern: '/settings/closed-dates'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/scheduling/controllers/create_closed_date_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/scheduling/controllers/create_closed_date_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/create_closed_date_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/create_closed_date_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'update_closed_date.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/closed-dates/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_closed_date_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_closed_date_controller').default['render']>>>
    }
  }
  'update_closed_date.execute': {
    methods: ["PUT"]
    pattern: '/settings/closed-dates/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/scheduling/controllers/update_closed_date_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/scheduling/controllers/update_closed_date_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_closed_date_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_closed_date_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'delete_closed_date.execute': {
    methods: ["DELETE"]
    pattern: '/settings/closed-dates/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/delete_closed_date_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/delete_closed_date_controller').default['execute']>>>
    }
  }
  'create_time_off.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/time-offs/new'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/create_time_off_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/create_time_off_controller').default['render']>>>
    }
  }
  'create_time_off.execute': {
    methods: ["POST"]
    pattern: '/settings/time-offs'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/scheduling/controllers/create_time_off_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/scheduling/controllers/create_time_off_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/create_time_off_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/create_time_off_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'update_time_off.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/time-offs/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_time_off_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_time_off_controller').default['render']>>>
    }
  }
  'update_time_off.execute': {
    methods: ["PUT"]
    pattern: '/settings/time-offs/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/scheduling/controllers/update_time_off_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/scheduling/controllers/update_time_off_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_time_off_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_time_off_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'delete_time_off.execute': {
    methods: ["DELETE"]
    pattern: '/settings/time-offs/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/delete_time_off_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/delete_time_off_controller').default['execute']>>>
    }
  }
  'update_working_hours.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/working-hours/:agendaId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { agendaId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_working_hours_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_working_hours_controller').default['render']>>>
    }
  }
  'update_working_hours.execute': {
    methods: ["PUT"]
    pattern: '/settings/working-hours/:agendaId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/scheduling/controllers/update_working_hours_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { agendaId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/scheduling/controllers/update_working_hours_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_working_hours_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_working_hours_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'create_schedule_day.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/schedule-days/new'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/create_schedule_day_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/create_schedule_day_controller').default['render']>>>
    }
  }
  'create_schedule_day.execute': {
    methods: ["POST"]
    pattern: '/settings/schedule-days'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/scheduling/controllers/create_schedule_day_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/scheduling/controllers/create_schedule_day_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/create_schedule_day_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/create_schedule_day_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'update_schedule_day.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/schedule-days/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_schedule_day_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_schedule_day_controller').default['render']>>>
    }
  }
  'update_schedule_day.execute': {
    methods: ["PUT"]
    pattern: '/settings/schedule-days/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/scheduling/controllers/update_schedule_day_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/scheduling/controllers/update_schedule_day_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_schedule_day_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/update_schedule_day_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'delete_schedule_day.execute': {
    methods: ["DELETE"]
    pattern: '/settings/schedule-days/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/delete_schedule_day_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/delete_schedule_day_controller').default['execute']>>>
    }
  }
  'get_bookable_days.render': {
    methods: ["GET","HEAD"]
    pattern: '/api/bookable-days'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#app/scheduling/controllers/get_bookable_days_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/get_bookable_days_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/get_bookable_days_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'get_bookable_slots.render': {
    methods: ["GET","HEAD"]
    pattern: '/api/bookable-slots'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#app/scheduling/controllers/get_bookable_slots_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/scheduling/controllers/get_bookable_slots_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/scheduling/controllers/get_bookable_slots_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'search.render': {
    methods: ["GET","HEAD"]
    pattern: '/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/search/controllers/search_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/search/controllers/search_controller').default['render']>>>
    }
  }
  'list_pets.render': {
    methods: ["GET","HEAD"]
    pattern: '/pets'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/pets/controllers/list_pets_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/pets/controllers/list_pets_controller').default['render']>>>
    }
  }
  'create_pet.render': {
    methods: ["GET","HEAD"]
    pattern: '/pets/new'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/pets/controllers/create_pet_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/pets/controllers/create_pet_controller').default['render']>>>
    }
  }
  'create_pet.execute': {
    methods: ["POST"]
    pattern: '/pets'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/pets/controllers/create_pet_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/pets/controllers/create_pet_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/pets/controllers/create_pet_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/pets/controllers/create_pet_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'get_pet.render': {
    methods: ["GET","HEAD"]
    pattern: '/pets/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/pets/controllers/get_pet_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/pets/controllers/get_pet_controller').default['render']>>>
    }
  }
  'update_pet.render': {
    methods: ["GET","HEAD"]
    pattern: '/pets/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/pets/controllers/update_pet_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/pets/controllers/update_pet_controller').default['render']>>>
    }
  }
  'update_pet.execute': {
    methods: ["PUT"]
    pattern: '/pets/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/pets/controllers/update_pet_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/pets/controllers/update_pet_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/pets/controllers/update_pet_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/pets/controllers/update_pet_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'delete_pet.execute': {
    methods: ["DELETE"]
    pattern: '/pets/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/pets/controllers/delete_pet_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/pets/controllers/delete_pet_controller').default['execute']>>>
    }
  }
  'list_pets.api': {
    methods: ["GET","HEAD"]
    pattern: '/api/pets'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/pets/controllers/list_pets_controller').default['api']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/pets/controllers/list_pets_controller').default['api']>>>
    }
  }
  'get_pet.api': {
    methods: ["GET","HEAD"]
    pattern: '/api/pets/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/pets/controllers/get_pet_controller').default['api']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/pets/controllers/get_pet_controller').default['api']>>>
    }
  }
  'list_consultations.render': {
    methods: ["GET","HEAD"]
    pattern: '/consultations'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/medical_records/controllers/list_consultations_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/medical_records/controllers/list_consultations_controller').default['render']>>>
    }
  }
  'create_consultation.render': {
    methods: ["GET","HEAD"]
    pattern: '/pets/:petId/consultations/new'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { petId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/medical_records/controllers/create_consultation_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/medical_records/controllers/create_consultation_controller').default['render']>>>
    }
  }
  'create_consultation.execute': {
    methods: ["POST"]
    pattern: '/pets/:petId/consultations'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/medical_records/controllers/create_consultation_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { petId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/medical_records/controllers/create_consultation_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/medical_records/controllers/create_consultation_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/medical_records/controllers/create_consultation_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'update_consultation.render': {
    methods: ["GET","HEAD"]
    pattern: '/pets/:petId/consultations/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { petId: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/medical_records/controllers/update_consultation_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/medical_records/controllers/update_consultation_controller').default['render']>>>
    }
  }
  'update_consultation.execute': {
    methods: ["PUT"]
    pattern: '/pets/:petId/consultations/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/medical_records/controllers/update_consultation_controller').default)['validator']>>
      paramsTuple: [ParamValue, ParamValue]
      params: { petId: ParamValue; id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/medical_records/controllers/update_consultation_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/medical_records/controllers/update_consultation_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/medical_records/controllers/update_consultation_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'create_vaccine.render': {
    methods: ["GET","HEAD"]
    pattern: '/pets/:petId/vaccines/new'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { petId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/medical_records/controllers/create_vaccine_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/medical_records/controllers/create_vaccine_controller').default['render']>>>
    }
  }
  'create_vaccine.execute': {
    methods: ["POST"]
    pattern: '/pets/:petId/vaccines'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/medical_records/controllers/create_vaccine_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { petId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/medical_records/controllers/create_vaccine_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/medical_records/controllers/create_vaccine_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/medical_records/controllers/create_vaccine_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'update_vaccine.render': {
    methods: ["GET","HEAD"]
    pattern: '/pets/:petId/vaccines/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { petId: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/medical_records/controllers/update_vaccine_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/medical_records/controllers/update_vaccine_controller').default['render']>>>
    }
  }
  'update_vaccine.execute': {
    methods: ["PUT"]
    pattern: '/pets/:petId/vaccines/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/medical_records/controllers/update_vaccine_controller').default)['validator']>>
      paramsTuple: [ParamValue, ParamValue]
      params: { petId: ParamValue; id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/medical_records/controllers/update_vaccine_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/medical_records/controllers/update_vaccine_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/medical_records/controllers/update_vaccine_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'create_prescription.render': {
    methods: ["GET","HEAD"]
    pattern: '/pets/:petId/prescriptions/new'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { petId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/medical_records/controllers/create_prescription_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/medical_records/controllers/create_prescription_controller').default['render']>>>
    }
  }
  'create_prescription.execute': {
    methods: ["POST"]
    pattern: '/pets/:petId/prescriptions'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/medical_records/controllers/create_prescription_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { petId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/medical_records/controllers/create_prescription_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/medical_records/controllers/create_prescription_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/medical_records/controllers/create_prescription_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'update_prescription.render': {
    methods: ["GET","HEAD"]
    pattern: '/pets/:petId/prescriptions/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { petId: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/medical_records/controllers/update_prescription_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/medical_records/controllers/update_prescription_controller').default['render']>>>
    }
  }
  'update_prescription.execute': {
    methods: ["PUT"]
    pattern: '/pets/:petId/prescriptions/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/medical_records/controllers/update_prescription_controller').default)['validator']>>
      paramsTuple: [ParamValue, ParamValue]
      params: { petId: ParamValue; id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#app/medical_records/controllers/update_prescription_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/medical_records/controllers/update_prescription_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/medical_records/controllers/update_prescription_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'show_onboarding.render': {
    methods: ["GET","HEAD"]
    pattern: '/onboarding'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#app/onboarding/controllers/show_onboarding_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/onboarding/controllers/show_onboarding_controller').default['render']>>>
    }
  }
  'update_onboarding.execute': {
    methods: ["POST"]
    pattern: '/onboarding'
    types: {
      body: ExtractBody<InferInput<(typeof import('#app/onboarding/controllers/update_onboarding_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#app/onboarding/controllers/update_onboarding_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#app/onboarding/controllers/update_onboarding_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#app/onboarding/controllers/update_onboarding_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'event_stream': {
    methods: ["GET","HEAD"]
    pattern: '/__transmit/events'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'subscribe': {
    methods: ["POST"]
    pattern: '/__transmit/subscribe'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'unsubscribe': {
    methods: ["POST"]
    pattern: '/__transmit/unsubscribe'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'attachments': {
    methods: ["GET","HEAD"]
    pattern: '/attachments/:key/:name?'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { key: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('@jrmc/adonis-attachment/controllers/attachments_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('@jrmc/adonis-attachment/controllers/attachments_controller').default['handle']>>>
    }
  }
}
