import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db";

class PropertyType extends Model {
  public name!: string;
}

PropertyType.init(
  {
    name: {
      type: new DataTypes.STRING(155),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "propertyTypes",
    sequelize,
  }
);

export default PropertyType;
