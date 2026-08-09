import { parsePhoneNumberFromString } from 'libphonenumber-js'

export function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60

  if (hours === 0) return `${minutes}min`
  if (minutes === 0) return `${hours}h`

  return `${hours}h ${minutes}min`
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export function formatPhoneNumber(phone: string): string {
  phone = phone.replace('+', '')

  if (phone.startsWith('521') && phone.length === 13) {
    phone = '52' + phone.slice(3)
  }

  const parsed = parsePhoneNumberFromString('+' + phone)

  if (!parsed || !parsed.isValid()) {
    return phone
  }

  return parsed.formatInternational()
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function downloadFile(url: string, filename = 'document') {
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  link.target = '_self'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function range(from: number, to: number): number[] {
  const step = from <= to ? 1 : -1
  return Array.from({ length: Math.abs(to - from) + 1 }, (_, i) => from + i * step)
}

export function sum(numbers: number[]): number {
  return numbers.reduce((acc, current) => acc + current, 0)
}

export function groupBy<T>(items: Array<T>, key: (item: T) => string) {
  const map = new Map<string, Array<T>>()
  for (const item of items) {
    const k = key(item)
    if (!map.has(k)) map.set(k, [])
    map.get(k)!.push(item)
  }
  return map
}

export function formatPrice(price: number, digits = 0) {
  if (price === 0) return 'Gratis'

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(price)
}
