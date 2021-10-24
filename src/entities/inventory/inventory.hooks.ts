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

// function processInventoryEntities(inventory: any): any {
//   const entitesObject: { [key: string]: any } = {}
//   const inventoryJson = inventory.toJSON()
//   let rootEntity: any = null
//   inventoryJson.entities.forEach((entity: any) => {
//     if (entity.parent === null) {
//       delete entity.parent
//       delete entity.index
//       rootEntity = entity
//     }
//     entitesObject[entity.entityId] = entity
//   })
//   inventoryJson.root = rootEntity?.entityId
//   inventoryJson.entities = entitesObject
//   return inventoryJson
// }

const { authenticate } = authentication.hooks

export default {
  before: {
    all: [authenticate('jwt')] /* authenticate('jwt') */,
    find: [
      addAssociations({
        models: [
          {
            model: 'inventory-type',
          }
        ]
      })
    ],
    get: [
      async context => {
        const inventoryTypeId = context.result.inventoryTypeId;

        // Since context.app.service('users').get returns a promise we can `await` it
        const inventoryType = await context.app.service('inventory-type').get(inventoryTypeId);

        // Update the result (the message)
        context.result.inventoryType = inventoryType;
        // Returning will resolve the promise with the `context` object
        return context;
      },
      addAssociations({
        models: [
          {
            model: 'inventory-type',
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
