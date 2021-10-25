import { disallow } from 'feathers-hooks-common'
import addAssociations from '@xrengine/server-core/src/hooks/add-associations'
import { HookContext } from '@feathersjs/feathers'
import * as authentication from '@feathersjs/authentication'

export default {
  before: {
    all: [],
    find: [addAssociations({
      models: [
        {
          model: 'inventory-item',
        }
      ]
    })],
    get: [async context => {
      const inventoryItemId = context.result.inventoryItemId;

      // Since context.app.service('users').get returns a promise we can `await` it
      const inventoryItem = await context.app.service('inventory-item').get(inventoryItemId);

      // Update the result (the message)
      context.result.inventoryItem = inventoryItem;
      // Returning will resolve the promise with the `context` object
      return context;
    },
    addAssociations({
      models: [
        {
          model: 'inventory-item',
        }
      ]
    })],
    create: [],
    update: [disallow()],
    patch: [disallow()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
} as any
