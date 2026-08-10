import '../css/app.css'
import { ReactElement } from 'react'
import { type Data } from '@generated/data'
import { createRoot } from 'react-dom/client'
import { renderApp } from '@inertiaui/modal-react'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react'
import { client, queryClient } from '~/lib/tuyau'
import Layout from '~/layouts/default'

export const appName = import.meta.env.VITE_APP_NAME || 'Vetcita'

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) => {
    return resolvePageComponent<ResolvedComponent>(
      `../pages/${name}.tsx`,
      import.meta.glob<ResolvedComponent>('../pages/**/*.tsx'),
      (page: ReactElement<Data.SharedProps>) => <Layout children={page} />
    )
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <QueryClientProvider client={queryClient}>
        <TuyauProvider client={client}>{renderApp(App as any, props as any)}</TuyauProvider>
      </QueryClientProvider>
    )
  },
  progress: {
    color: '#6950f3',
  },
})
