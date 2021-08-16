export type FieldValidatorsType = (value: string) => string | undefined

export const required: FieldValidatorsType = (value) => (value ? undefined : 'Required');

export const maxLength = (max: number): FieldValidatorsType => (value) => value.length < max ? undefined : `Must be ${max} characters or less`;