import SendAppointmentRemindersJob from '#notifications/jobs/send_appointment_reminders_job'
import { DEFAULT_TIMEZONE } from '#app/shared/services/time_service'

SendAppointmentRemindersJob.schedule({}).cron('0 8 * * *').timezone(DEFAULT_TIMEZONE).run()
