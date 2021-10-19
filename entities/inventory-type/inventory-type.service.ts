import { Application } from '../../../declarations'
import { InventoryType } from './inventory-type.class'
import createModel from './inventory-type.model'
import hooks from './inventory-type.hooks'
import inventoryTypeDocs from './inventory-type.docs'

declare module '../../../declarations' {
  interface ServiceTypes {
    'inventory-type': InventoryType 
  }
}

export default (app: Application): any => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  /**
   * Initialize our service with any options it requires and docs
   *
   * @author DRC
   */
  const event = new InventoryType(options, app)
  event.docs = inventoryTypeDocs 
  app.use('inventory-type', event)

  const service = app.service('inventory-type')

  service.hooks(hooks)
}
