import fortune from 'fortune'
import omit from 'lodash.omit'

const { methods } = fortune

function _create(record) {
  record = Object.assign(omit(record, 'id'), { updatedAt: new Date(), createdAt: new Date() })
  return record
}

function _update(record) {
  if (record.replace) record.replace = Object.assign(omit(record.replace, ['id', 'createdAt']), { updatedAt: new Date() })
  return record
}

export default class RecordBase {
  static input(context, record, update) {
    switch (context.request.method) {
      case methods.create:
        return _create(record)

      case methods.update:
        return _update(update)
    }
  }
}
