// import * as authentication from '@feathersjs/authentication'
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

function processInventoryEntities(inventory: any): any {
  const entitesObject: { [key: string]: any } = {}
  const inventoryJson = inventory.toJSON()
  let rootEntity: any = null
  inventoryJson.entities.forEach((entity: any) => {
    if (entity.parent === null) {
      delete entity.parent
      delete entity.index
      rootEntity = entity
    }
    entitesObject[entity.entityId] = entity
  })
  inventoryJson.root = rootEntity?.entityId
  inventoryJson.entities = entitesObject
  return inventoryJson
}

/* function processCollectionsEntities () {
  return (context: HookContext): HookContext => {
    context.result = context.result.map(processCollectionEntities)
    return context
  }
} */

const { authenticate } = authentication.hooks

export default {
  before: {
    all: [authenticate('jwt')] /* authenticate('jwt') */,
    find: [
      //attachOwnerIdInQuery('userId'),
      /*addAssociations({
        models: [
          {
            model: 'entity',
            include: [
              {
                model: 'component'
              }
            ]
          }
        ]
      })*/
    ],
    get: [
      /*addAssociations({
        models: [
          {
            model: 'entity',
            include: [
              {
                model: 'component'
              }
            ]
          }
        ]
      })*/
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      // processCollectionsEntities()
    ],
    get: [
      (context: HookContext): HookContext => {
        context.result = processInventoryEntities(context.result)
        return context
      }
    ],
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
