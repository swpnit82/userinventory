import { Sequelize, DataTypes } from 'sequelize'
import { Application } from '../../../declarations'
import { inventoryType as inventoryTypeEnum } from './inventoryType'

export default (app: Application): any => {
  const sequelizeClient: Sequelize = app.get('sequelizeClient')
  const inventoryType = sequelizeClient.define(
    'inventory_type',
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        // primaryKey: true,
        unique: true,
        values: Object.keys(inventoryTypeEnum )
      },
       inventoryTypeId : {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV1,
         allowNull: false,
         primaryKey: true,
         unique: true,
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

  ;(inventoryType as any).associate = (models: any): void => { 
    ;(inventoryType as any).hasMany(models.inventory, { foreignKey: 'inventoryTypeId', required: true})
  }

  return inventoryType
}
