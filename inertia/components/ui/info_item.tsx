interface InfoItemProps {
  label: string
  value?: React.ReactNode
  className?: string
}

export function InfoItem(props: InfoItemProps) {
  const { label, value, className } = props

  return (
    <div className={className}>
      <div className="text-[15px]/5 font-medium">{label}</div>
      <div className="text-[15px]/5 font-normal text-muted">{value || '-'}</div>
    </div>
  )
}
