import fortune from 'fortune'
const { message } = fortune

// Add application error messages in English (default language).
// More languages can be defined as keys on the `message` function.
Object.assign(message.en, {
  'InvalidAuthorization': 'The given user and/or password is invalid.',
  'InvalidPermission': 'You do not have permission to do that.',
  'MissingField': 'The required field "{field}" is missing.'
})
