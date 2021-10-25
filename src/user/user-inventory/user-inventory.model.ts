import { Sequelize, DataTypes } from 'sequelize'
import { Application } from '../../../declarations'

export default (app: Application): any => {
  const sequelizeClient: Sequelize = app.get('sequelizeClient')
  const userInventory = sequelizeClient.define(
    'user_inventory',
    {
      userInventoryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      addedOn: {
        type: DataTypes.DATE,
      }
    },
    {
      hooks: {
        beforeCount(options: any): void {
          options.raw = true
        },
        beforeUpdate(instance: any, options: any): void {
          throw new Error("Can't update a type!")
        }
      },
      timestamps: false
    }
  )

  ;(userInventory as any).assocate = (models: any): void => {
    ;(userInventory as any).belongsTo(models.inventory_item, { foreignKey: 'inventoryItemId', required: true })
    ;(userInventory as any).belongsTo(models.user, { foreignKey: 'userId', required: true})
  }

  return userInventory
}
