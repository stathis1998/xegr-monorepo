import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db";

class User extends Model {
  public username!: string;
  public password!: string;
}

User.init(
  {
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

export default User;
