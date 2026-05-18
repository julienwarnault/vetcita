import { Toaster } from 'sonner'
import { ReactElement } from 'react'
import { Data } from '@generated/data'
import { usePage } from '@inertiajs/react'
import { Form, Link } from '@adonisjs/inertia/react'
import { useFlashToasts } from '~/hooks/use_flash'

export default function Layout({ children }: { children: ReactElement }) {
  useFlashToasts()

  const { user } = usePage<Data.SharedProps>().props

  return (
    <>
      <header>
        <nav>
          {user ? (
            <>
              <span>{user.initials}</span>
              <Form route="session.destroy">
                <button type="submit">Logout</button>
              </Form>
            </>
          ) : (
            <>
              <Link route="new_account.create">Signup</Link>
              <Link route="session.create">Login</Link>
            </>
          )}
        </nav>
      </header>
      <main>{children}</main>
      <Toaster position="top-center" richColors />
    </>
  )
}
