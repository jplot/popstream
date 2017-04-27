import fortune from 'fortune'
import _ from 'underscore'

const { methods } = fortune

function createRecord(record) {
  record = Object.assign(_.omit(record, 'id'), { updatedAt: new Date(), createdAt: new Date() })
  return record
}

function updateRecord(record) {
  if (record.replace) record.replace = Object.assign(_.omit(record.replace, ['id', 'createdAt']), { updatedAt: new Date() })
  return record
}

export default {
  input(context, record, update) {
    switch (context.request.method) {
      case methods.create:
        return createRecord(record)

      case methods.update:
        return updateRecord(update)
    }
  },

  create: createRecord,
  update: updateRecord
}
