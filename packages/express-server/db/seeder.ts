import User from "../src/api/models/userModel";
import Ad from "../src/api/models/adModel";
import authService from "../src/api/services/authService";

export async function seed() {
  const usersToCreate = 5;
  const adsToCreate = 10;

  for (let i = 0; i < usersToCreate; i++) {
    const hashedPassword = await authService.hashPassword(`password${i}`);
    await User.create({
      username: `user${i}`,
      password: hashedPassword,
    });
  }

  const users = await User.findAll();

  for (let i = 0; i < adsToCreate; i++) {
    await Ad.create({
      title: `Ad ${i}`,
      description: `Description for ad ${i}`,
      price: (Math.random() * 100000 + 300).toFixed(2),
      propertyType: "house",
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
