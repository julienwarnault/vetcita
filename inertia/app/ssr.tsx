import { ReactElement } from 'react'
import { type Data } from '@generated/data'
import ReactDOMServer from 'react-dom/server'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react'
import Layout from '~/layouts/default'
import { client } from '~/lib/tuyau'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      return resolvePageComponent<ResolvedComponent>(
        `../pages/${name}.tsx`,
        import.meta.glob<ResolvedComponent>('../pages/**/*.tsx', { eager: true }),
        (resolvedPage: ReactElement<Data.SharedProps>) => <Layout children={resolvedPage} />
      )
    },
    setup: ({ App, props }) => {
      return (
        <TuyauProvider client={client}>
          <App {...props} />
        </TuyauProvider>
      )
    },
  })
}
