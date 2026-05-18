/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  login: {
    render: typeof routes['login.render']
    execute: typeof routes['login.execute']
  }
  logout: {
    execute: typeof routes['logout.execute']
  }
  home: typeof routes['home']
}
