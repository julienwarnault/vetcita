import type { ReactNode } from 'react'
import MinimalLayout from '~/layouts/minimal'
import { Logo } from '~/components/logo'

interface LegalLayoutProps {
  title: string
  description: string
  updatedAt: string
  children: ReactNode
}

export default function LegalLayout({ title, description, updatedAt, children }: LegalLayoutProps) {
  return (
    <MinimalLayout className="bg-white">
      <>
        <header className="sticky top-0 z-10 border-b bg-white">
          <div className="container-xl flex h-18 items-center">
            <Logo />
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-18">
            <header className="border-b pb-10">
              <p className="mb-3 text-[14px]/5 font-semibold text-accent">Información legal</p>
              <h1 className="text-[36px]/10 font-bold sm:text-[48px]/13">{title}</h1>
              <p className="mt-4 max-w-2xl text-[17px]/7 text-muted">{description}</p>
              <p className="mt-5 text-[14px]/5 text-muted">Última actualización: {updatedAt}</p>
            </header>

            <article className="prose max-w-none py-10 [--tw-prose-body:var(--color-foreground)] [--tw-prose-headings:var(--color-foreground)] [--tw-prose-links:var(--color-foreground)] [--tw-prose-bold:var(--color-foreground)] [--tw-prose-bullets:var(--color-muted)] prose-h2:text-[24px]/8 prose-h2:font-semibold prose-a:decoration-border-strong prose-a:underline-offset-3 hover:prose-a:text-accent">
              {children}
            </article>
          </div>
        </main>

        <footer className="border-t bg-white">
          <div className="container flex flex-col gap-4 py-8 text-[14px]/5 text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Vetcita</p>
          </div>
        </footer>
      </>
    </MinimalLayout>
  )
}

LegalLayout.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
