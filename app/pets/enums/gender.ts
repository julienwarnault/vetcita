export enum Gender {
  Male = 'male',
  Female = 'female',
  Unknown = 'unknown',
}

export const GenderLabels: Record<Gender, string> = {
  [Gender.Male]: 'Macho',
  [Gender.Female]: 'Hembra',
  [Gender.Unknown]: 'Desconocido',
}
