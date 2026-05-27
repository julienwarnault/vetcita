import transmit from '@adonisjs/transmit/services/main'

transmit.authorize<{ tenantId: string }>('tenants/:tenantId/appointments', (ctx, { tenantId }) => {
  return ctx.auth.user?.tenantId === tenantId
})
