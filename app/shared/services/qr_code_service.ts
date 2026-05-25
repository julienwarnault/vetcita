import qrcode from 'qrcode'

export class QrCodeService {
  async generateQRCode(url: string) {
    const qrCodeUrl = await qrcode.toDataURL(url, { width: 400, margin: 0 })
    return qrCodeUrl
  }
}
