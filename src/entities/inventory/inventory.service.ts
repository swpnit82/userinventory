import { Application } from '../../../declarations'
import { Inventory }  from './inventory.class'
import createModel from './inventory.model'
import hooks from './inventory.hooks'
import inventoryDocs from './inventory.docs'

import inventoryTypeService from '../inventory-type/inventory-type.service'

declare module '../../../declarations' {
  interface ServiceTypes {
    inventory : Inventory 
  }
}

export default (app: Application): any => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true,
  }

  // app.get("/inventory", async (req,res)=>{
    // let newResponse = await app.service('inventory-type')._find({id: req.body.inventoryTypeId})
    // return {
    //       total: newResponse.total,
    //       limit: newResponse.limit,
    //       skip: newResponse.skip,
    //       data: newResponse 
    //   }
  // })
  /**
   * Initialize our service with any options it requires and docs
   *
   * @author DRC
   */
  const event = new Inventory (options, app)
  event.docs = inventoryDocs
  app.use('inventory', event)

  

  const service = app.service('inventory')
  service.hooks(hooks)
}
