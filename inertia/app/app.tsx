import '../css/app.css'
import { ReactElement } from 'react'
import Layout from '~/layouts/default'
import { Data } from '@generated/data'
import { createRoot } from 'react-dom/client'
import { renderApp } from '@inertiaui/modal-react'
import { createInertiaApp } from '@inertiajs/react'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { client, queryClient } from '~/lib/tuyau'

export const appName = import.meta.env.VITE_APP_NAME || 'Vetcita'

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx'),
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
