import { inventoryType } from './inventoryType'

export const inventoryTypeSeed = {
  path: 'inventory-type',
  randomize: false,
  templates: [{ type: inventoryType.scene }, { type: inventoryType.inventory }, { type: inventoryType.project }]
}