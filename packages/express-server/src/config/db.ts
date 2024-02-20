import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/xegr.sqlite",
});

export default sequelize;
