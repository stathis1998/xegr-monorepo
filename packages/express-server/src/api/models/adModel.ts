import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db";

class Ad extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public price!: number;
  public propertyType!: string;
  public address!: string;
  public bedrooms!: number;
  public bathrooms!: number;
  public area!: number;
  public listingType!: string;

  public userId!: number;
  public placeId!: string;
}

Ad.init(
  {
    title: {
      type: new DataTypes.STRING(155),
      allowNull: false,
    },
    description: {
      type: new DataTypes.TEXT(),
      allowNull: true,
    },
    price: {
      type: new DataTypes.FLOAT(),
      allowNull: false,
    },
    propertyType: {
      type: new DataTypes.STRING(155),
      allowNull: false,
      references: {
        model: "propertyTypes",
        key: "name",
      },
    },
    listingType: {
      type: new DataTypes.STRING(155),
      allowNull: false,
      references: {
        model: "listingTypes",
        key: "name",
      },
    },
    address: {
      type: new DataTypes.STRING(155),
      allowNull: false,
    },
    bedrooms: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    bathrooms: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    area: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    userId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    placeId: {
      type: new DataTypes.STRING(155),
      allowNull: false,
    },
  },
  {
    tableName: "ads",
    sequelize,
  }
);

export default Ad;
