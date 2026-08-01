import SendAppointmentRemindersJob from '#notifications/jobs/send_appointment_reminders_job'
import SendVaccineRemindersJob from '#notifications/jobs/send_vaccine_reminders_job'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'

SendAppointmentRemindersJob.schedule({}).cron('0 8 * * *').timezone(DEFAULT_TIMEZONE).run()
SendVaccineRemindersJob.schedule({}).cron('0 10 * * *').timezone(DEFAULT_TIMEZONE).run()
