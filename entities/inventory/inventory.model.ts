import { Sequelize, DataTypes } from 'sequelize'
import { Application } from '../../../declarations'
import generateShortId from '../../util/generate-short-id'
import config from '../../appconfig'

const INVENTORY_API_ENDPOINT = `${config.server.url}/inventory`

export default (app: Application): any => {
  const sequelizeClient: Sequelize = app.get('sequelizeClient')
  const inventory = sequelizeClient.define(
    'inventory',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true
      },
      inventoryTypeId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
      },
      sid: {
        type: DataTypes.STRING,
        defaultValue: (): string => generateShortId(8),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      version: DataTypes.INTEGER,
      metadata: {
        type: DataTypes.JSON,
        defaultValue: {},
        allowNull: true,
        get(this: any): string | JSON {
          const metaData = this.getDataValue('metadata')
          if (!metaData) {
            return ''
          } else {
            return metaData
          }
        }
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      ownedFileIds: {
        type: DataTypes.TEXT({ length: 'medium' }),
        allowNull: true
      }
    },
    {
      hooks: {
        beforeCount(options: any): void {
          options.raw = true
        }
      }
    }
  )

  ;(inventory as any).associate = (models: any): void => {
    ;(inventory as any).belongsTo(models.inventory_type, { foreignKey: 'type', required: true })
    ;(inventory as any).belongsTo(models.static_resource, {
      as: 'thumbnail_owned_file',
      required: false,
      constraints: false
    })
    ;(inventory as any).hasMany(models.entity, { required: false, constraints: false, delete: 'cascade' })
    ;(inventory as any).belongsTo(models.location)
  }

  return inventory
}
