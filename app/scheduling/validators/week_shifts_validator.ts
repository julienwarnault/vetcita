import vine from '@vinejs/vine'

const weekShiftsRule = vine.createRule((value, _, field) => {
  if (!Array.isArray(value)) return

  const reportField = (path: string, rule: string) => {
    field.report('', rule, {
      ...field,
      getFieldPath: () => `${field.getFieldPath()}.${path}`,
    })
  }

  value.forEach((weekShift, i) => {
    if (!Array.isArray(weekShift)) return

    const shifts = weekShift as { startTime: string; endTime: string }[]

    for (let j = 0; j < shifts.length; j++) {
      const { startTime: start, endTime: end } = shifts[j]

      if (j > 0) {
        const { endTime: previousEnd } = shifts[j - 1]

        if (previousEnd > start) {
          reportField(`${i}.${j - 1}.endTime`, 'overlappingShift')
          reportField(`${i}.${j}.startTime`, 'overlappingShift')
        }
      }

      if (start > end) {
        reportField(`${i}.${j}.endTime`, 'invalidShiftRange')
      }
    }
  })
})

export const weekShiftsSchema = () =>
  vine
    .array(vine.array(vine.object({ startTime: vine.string(), endTime: vine.string() })))
    .fixedLength(7)
    .use(weekShiftsRule())
