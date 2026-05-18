/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  dashboard: typeof routes['dashboard']
  calendar: typeof routes['calendar']
  login: {
    render: typeof routes['login.render']
    execute: typeof routes['login.execute']
  }
  logout: {
    execute: typeof routes['logout.execute']
  }
}
