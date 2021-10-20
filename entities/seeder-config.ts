import { ServicesSeedConfig } from '@xrengine/common/src/interfaces/ServicesSeedConfig'
import { collectionTypeSeed } from './collection-type/collection-type.seed'
import { collectionSeed } from './collection/collection.seed'
import { componentTypeSeed } from './component-type/component-type.seed'
import { componentSeed } from './component/component.seed'
import { entitySeed } from './entity/entity.seed'
import { inventoryTypeSeed } from './inventory-type/inventory-type.seed'
import { inventorySeed } from './inventory/inventory.seed'
import { userInventorySeed } from './user-inventory/user-inventory.seed'

export const entitySeeds: Array<ServicesSeedConfig> = [collectionTypeSeed, collectionSeed, inventoryTypeSeed, inventorySeed, userInventorySeed, entitySeed]

export const componentSeeds: Array<ServicesSeedConfig> = [componentTypeSeed, componentSeed]
