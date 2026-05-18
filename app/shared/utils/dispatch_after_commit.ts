import { transactionContext } from '#shared/contexts/transaction_context'

export async function dispatchAfterCommit(callback: () => Promise<void>): Promise<void> {
  const trx = transactionContext.get()

  if (trx) {
    trx.after('commit', callback)
  } else {
    await callback()
  }
}
