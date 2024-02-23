import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db";

class ListingType extends Model {
  public name!: string;
}

ListingType.init(
  {
    name: {
      type: new DataTypes.STRING(155),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "listingTypes",
    sequelize,
  }
);

export default ListingType;
