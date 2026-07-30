import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { urlFor } from '@adonisjs/core/services/url_builder'
import { QrCodeService } from '#shared/services/qr_code_service'
import { appUrl } from '#config/app'

@inject()
export default class BookingLinkController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  async render({ inertia, tenantId }: HttpContext) {
    const publicUrl = urlFor('book_appointment.render', { tenantId }, { prefixUrl: appUrl })

    const qrDataUrl = await this.qrCodeService.generateQRCode(publicUrl)

    return inertia.render('settings/booking_link', { publicUrl, qrDataUrl })
  }
}
