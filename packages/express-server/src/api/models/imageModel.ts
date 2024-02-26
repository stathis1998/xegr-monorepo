import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db";

class Image extends Model {
  public name!: string;
}

Image.init(
  {
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    alt: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    adId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      references: {
        model: "ads",
        key: "id",
      },
    },
  },
  {
    tableName: "image",
    sequelize,
  }
);

export default Image;
