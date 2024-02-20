import authService from "../src/api/services/authService";

import User from "../src/api/models/userModel";
import Ad from "../src/api/models/adModel";
import PropertyType from "../src/api/models/propertyTypeModel";

export async function seed() {
  const usersToCreate = 5;
  const adsToCreate = 10;

  // Create users
  for (let i = 0; i < usersToCreate; i++) {
    const hashedPassword = await authService.hashPassword(`password${i}`);
    await User.create({
      username: `user${i}`,
      password: hashedPassword,
    });
  }

  // Create property types
  const propertyTypesValues = ["house", "apartment", "condo", "townhouse"];
  for (const propertyTypeValue of propertyTypesValues) {
    await PropertyType.create({ name: propertyTypeValue });
  }

  // Create ads
  const users = await User.findAll();
  const propertyTypes = await PropertyType.findAll();
  for (let i = 0; i < adsToCreate; i++) {
    await Ad.create({
      title: `Ad ${i}`,
      description: `Description for ad ${i}`,
      price: (Math.random() * 100000 + 300).toFixed(2),
      propertyType:
        propertyTypes[
          Math.floor(Math.random() * propertyTypes.length)
        ].getDataValue("name"),
      address: `Address for ad ${i}`,
      bedrooms: Math.floor(Math.floor(Math.random() * 5) + 2),
      bathrooms: Math.floor(Math.floor(Math.random() * 5) + 2),
      area: Math.floor(Math.floor(Math.random() * 1000) + 100),
      userId:
        users[Math.floor(Math.random() * users.length)].getDataValue("id"),
      placeId: `placeId${i}`,
    });
  }
}
