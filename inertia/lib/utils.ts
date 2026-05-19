export function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60

  if (hours === 0) return `${minutes}min`
  if (minutes === 0) return `${hours}h`

  return `${hours}h ${minutes}min`
}
