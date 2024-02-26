import Image from "../api/models/imageModel";
import Ad from "../api/models/adModel";

function runAssosiacion() {
  Ad.hasMany(Image, { foreignKey: "adId", as: "images", onDelete: "CASCADE" });
  Image.belongsTo(Ad, { foreignKey: "adId", as: "ad", onDelete: "CASCADE" });
}

export { runAssosiacion };
