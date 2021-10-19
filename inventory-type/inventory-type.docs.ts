/**
 * An object for inv documentation configiration
 *
 * @author DRC
 */
 export default {
    definitions: {
      'inventory-type': {
        type: 'object',
        properties: {
          type: {
            type: 'string'
          },
          id:{
              type: 'string'
          }
        }
      },
      'inventory-type_list': {
        type: 'array',
        items: { $ref: '#/definitions/inventory-type' }
      }
    }
  }