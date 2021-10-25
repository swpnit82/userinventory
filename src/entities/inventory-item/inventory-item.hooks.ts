import attachOwnerIdInQuery from '@xrengine/server-core/src/hooks/set-loggedin-user-in-query'
import addAssociations from '@xrengine/server-core/src/hooks/add-associations'
import { HookContext } from '@feathersjs/feathers'
import * as authentication from '@feathersjs/authentication'

const logRequest = (options = {}) => {
  return async (context: HookContext): Promise<HookContext> => {
    const { data, params } = context
    if (context.error) {
      console.log('***** Error')
      console.log(context.error)
    }
    const body = params.body || {}
    console.log(body)
    return context
  }
}

const { authenticate } = authentication.hooks

export default {
  before: {
    all: [authenticate('jwt')] /* authenticate('jwt') */,
    find: [
      addAssociations({
        models: [
          {
            model: 'inventory-item-type',
          }
        ]
      })
    ],
    get: [
      async context => {
        const inventoryItemTypeId = context.result.inventoryItemTypeId;

        // Since context.app.service('users').get returns a promise we can `await` it
        const inventoryItemType = await context.app.service('inventory-item-type').get(inventoryItemTypeId);

        // Update the result (the message)
        context.result.inventoryItemType = inventoryItemType;
        // Returning will resolve the promise with the `context` object
        return context;
      },
      addAssociations({
        models: [
          {
            model: 'inventory-item-type',
          }
        ]
      })
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      // processInventoryEntities()
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [logRequest()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
} as any
