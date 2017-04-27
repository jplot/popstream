import fortune from 'fortune'
import recordBase from './base'
import atob from 'atob'
import crypto from 'crypto'

const hashAlgorithm = 'SHA256'

const { methods, errors: { BadRequestError, UnauthorizedError, ForbiddenError } } = fortune
const recordType = {
  name: 'user',

  definition: {
    email: String,
    password: Buffer,
    salt: Buffer,
    channels: [Array('channel'), 'user'],
    updatedAt: Date,
    createdAt: Date
  },

  input(context, record, update) {
    const { request: { method, meta: { language } } } = context

    switch (method) {
      case methods.create:
        for (const field of ['email', 'password'])
          if ((!field in record))
            throw new BadRequestError(message('MissingField', language, { field }))

        const { email, password } = record
        return recordBase.create(Object.assign({ email }, makePassword(password)))

      case methods.update:
        if (update.replace) {
          const { replace: { email, password } } = update
          update.replace = { email }

          if (password) Object.assign(update.replace, makePassword(password))
        }
        return recordBase.update(update)
    }
  },

  output(context, record) {
    delete record.password
    delete record.salt
  }
}

function makePassword(string) {
  const salt = crypto.randomBytes(32)
  const password = crypto.createHash(hashAlgorithm)
                         .update(salt).update('' + string).digest()

  return { salt, password }
}

export default recordType
