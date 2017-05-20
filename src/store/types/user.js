import fortune from 'fortune'
import RecordBase from './base'
import atob from 'atob'
import crypto from 'crypto'

const hashAlgorithm = 'SHA256'

const { methods, errors: { BadRequestError, UnauthorizedError, ForbiddenError } } = fortune

function _makePassword(string) {
  const salt = crypto.randomBytes(32)
  const password = crypto.createHash(hashAlgorithm)
                         .update(salt).update('' + string).digest()

  return { salt, password }
}

export default class extends RecordBase {
  static get NAME() {
    return 'user'
  }

  static get DEFINITION() {
    return {
      email: String,
      password: Buffer,
      salt: Buffer,
      channels: [Array('channel'), 'user'],
      updatedAt: Date,
      createdAt: Date
    }
  }

  static input(context, record, update) {
    const { request: { method, meta: { language } } } = context

    switch (method) {
      case methods.create:
        for (const field of ['email', 'password'])
          if ((!field in record))
            throw new BadRequestError(message('MissingField', language, { field }))

        const { email, password } = record

        Object.assign({ email }, _makePassword(password))

        return super.input(context, record, update)

      case methods.update:
        if (update.replace) {
          const { replace: { email, password } } = update
          update.replace = { email }

          if (password) Object.assign(update.replace, _makePassword(password))
        }

        return super.input(context, record, update)
    }
  }

  static output(context, record) {
    delete record.password
    delete record.salt
  }
}
