export enum Gender {
  Male = 'male',
  Female = 'female',
  Unknown = 'unknown',
}

export const GenderLabel: Record<Gender, string> = {
  [Gender.Male]: 'Macho',
  [Gender.Female]: 'Hembra',
  [Gender.Unknown]: 'Desconocido',
}

export function getGenderLabel(gender: Gender): string {
  return GenderLabel[gender]
}
