export const required = (value) => (value ? undefined : 'Required');

export const maxLength = max => value => value.length < max ? undefined : `Must be ${max} characters or less`;

// export const email = max => value => value.split('').maps