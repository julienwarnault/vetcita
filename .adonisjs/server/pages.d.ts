import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'agendas/form': ExtractProps<(typeof import('../../inertia/pages/agendas/form.tsx'))['default']>
    'agendas/list': ExtractProps<(typeof import('../../inertia/pages/agendas/list.tsx'))['default']>
    'appointment_statuses/form': ExtractProps<(typeof import('../../inertia/pages/appointment_statuses/form.tsx'))['default']>
    'appointment_statuses/list': ExtractProps<(typeof import('../../inertia/pages/appointment_statuses/list.tsx'))['default']>
    'appointment_types/form': ExtractProps<(typeof import('../../inertia/pages/appointment_types/form.tsx'))['default']>
    'appointment_types/list': ExtractProps<(typeof import('../../inertia/pages/appointment_types/list.tsx'))['default']>
    'appointments/form': ExtractProps<(typeof import('../../inertia/pages/appointments/form.tsx'))['default']>
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'booking/confirm': ExtractProps<(typeof import('../../inertia/pages/booking/confirm.tsx'))['default']>
    'booking/form': ExtractProps<(typeof import('../../inertia/pages/booking/form.tsx'))['default']>
    'calendar': ExtractProps<(typeof import('../../inertia/pages/calendar.tsx'))['default']>
    'dashboard': ExtractProps<(typeof import('../../inertia/pages/dashboard.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'patients/form': ExtractProps<(typeof import('../../inertia/pages/patients/form.tsx'))['default']>
    'patients/list': ExtractProps<(typeof import('../../inertia/pages/patients/list.tsx'))['default']>
    'patients/show': ExtractProps<(typeof import('../../inertia/pages/patients/show.tsx'))['default']>
    'settings/booking_link': ExtractProps<(typeof import('../../inertia/pages/settings/booking_link.tsx'))['default']>
    'settings/show': ExtractProps<(typeof import('../../inertia/pages/settings/show.tsx'))['default']>
    'tenants/form': ExtractProps<(typeof import('../../inertia/pages/tenants/form.tsx'))['default']>
    'search': ExtractProps<(typeof import('../../inertia/pages/search.tsx'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.tsx'))['default']>
  }
}
