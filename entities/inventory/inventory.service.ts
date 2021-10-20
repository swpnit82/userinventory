import { Application } from '../../../declarations'
import { Inventory }  from './inventory.class'
import createModel from './inventory.model'
import hooks from './inventory.hooks'
import inventoryDocs from './inventory.docs'

declare module '../../../declarations' {
  interface ServiceTypes {
    inventory : Inventory 
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
   * @author Vyacheslav Solovjov
   */
  const event = new Inventory (options, app)
  event.docs = inventoryDocs
  app.use('inventory', event)

  const service = app.service('inventory')
  service.hooks(hooks)
}
