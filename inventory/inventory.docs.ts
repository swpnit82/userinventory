/**
 * An object for swagger documentation configiration
 *
 * @author DRC
 */

 export default {
    definitions: {
      inventory: {
        type: 'object',
        properties: {
        id: {
            type: 'string'
        },
        inventoryTypeId: {
            type: 'string'
        },
          sid: {
            type: 'string'
          },
          name: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          version: {
            type: 'integer'
          },
          metadata: {
            type: 'object'
          },
          isPublic: {
            type: 'integer'
          },
          url: {
            type: 'string'
          },
          ownedFileIds: {
            type: 'string'
          }
        }
      },
      inventory_list: {
        type: 'array',
        items: { $ref: '#/definitions/inventory' }
      }
    },
    securities: ['create', 'update', 'patch', 'remove'],
    operations: {
      find: {
        security: [{ bearer: [] }]
      }
    }
  }
  