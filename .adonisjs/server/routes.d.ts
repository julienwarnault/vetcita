import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'dashboard': { paramsTuple?: []; params?: {} }
    'calendar': { paramsTuple?: []; params?: {} }
    'login.render': { paramsTuple?: []; params?: {} }
    'login.execute': { paramsTuple?: []; params?: {} }
    'logout.execute': { paramsTuple?: []; params?: {} }
    'list_agendas.render': { paramsTuple?: []; params?: {} }
    'create_agenda.render': { paramsTuple?: []; params?: {} }
    'create_agenda.execute': { paramsTuple?: []; params?: {} }
    'update_agenda.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'update_agenda.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'dashboard': { paramsTuple?: []; params?: {} }
    'calendar': { paramsTuple?: []; params?: {} }
    'login.render': { paramsTuple?: []; params?: {} }
    'list_agendas.render': { paramsTuple?: []; params?: {} }
    'create_agenda.render': { paramsTuple?: []; params?: {} }
    'update_agenda.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'dashboard': { paramsTuple?: []; params?: {} }
    'calendar': { paramsTuple?: []; params?: {} }
    'login.render': { paramsTuple?: []; params?: {} }
    'list_agendas.render': { paramsTuple?: []; params?: {} }
    'create_agenda.render': { paramsTuple?: []; params?: {} }
    'update_agenda.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'login.execute': { paramsTuple?: []; params?: {} }
    'logout.execute': { paramsTuple?: []; params?: {} }
    'create_agenda.execute': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'update_agenda.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}