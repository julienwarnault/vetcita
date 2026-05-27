import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { urlFor } from '@adonisjs/core/services/url_builder'
import { QrCodeService } from '#app/shared/services/qr_code_service'

@inject()
export default class BookingLinkController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  async render({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const publicUrl = urlFor('book_appointment.render', { tenantId: user.tenantId })

    const qrDataUrl = await this.qrCodeService.generateQRCode(publicUrl)

    return inertia.render('settings/booking_link', { publicUrl, qrDataUrl })
  }
}
