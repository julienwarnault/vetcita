import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'dashboard': { paramsTuple?: []; params?: {} }
    'calendar': { paramsTuple?: []; params?: {} }
    'login.render': { paramsTuple?: []; params?: {} }
    'login.execute': { paramsTuple?: []; params?: {} }
    'logout.execute': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'dashboard': { paramsTuple?: []; params?: {} }
    'calendar': { paramsTuple?: []; params?: {} }
    'login.render': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'dashboard': { paramsTuple?: []; params?: {} }
    'calendar': { paramsTuple?: []; params?: {} }
    'login.render': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'login.execute': { paramsTuple?: []; params?: {} }
    'logout.execute': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}