import sequelize from "../src/config/db";

import User from "../src/api/models/userModel";
import Ad from "../src/api/models/adModel";

import PropertyType from "../src/api/models/propertyTypeModel";
import ListingType from "../src/api/models/listingTypeModel";
import { searchPhotos } from "../src/utils/imageUtils";

import Image from "../src/api/models/imageModel";

export async function seed() {
  console.log("Seeding database...");
  const t = await sequelize.transaction();

  try {
    const usersToCreate = 5;
    const adsToCreate = 10;

    // Test user
    await User.create(
      {
        username: "admin",
        password: "admin1234",
      },
      { transaction: t }
    );

    // Create users
    for (let i = 0; i < usersToCreate; i++) {
      await User.create(
        {
          username: `user${i}`,
          password: `password${i}`,
        },
        { transaction: t }
      );
    }

    // Create property types
    const propertyTypesValues = ["House", "Apartment", "Condo", "Townhouse"];
    for (const propertyTypeValue of propertyTypesValues) {
      await PropertyType.create(
        { name: propertyTypeValue },
        { transaction: t }
      );
    }

    // Create listing types
    const listingTypesValues = ["Rent", "Sale", "Lease"];
    for (const listingTypeValue of listingTypesValues) {
      await ListingType.create({ name: listingTypeValue }, { transaction: t });
    }

    // Create ads
    const users = await User.findAll({ transaction: t });
    const propertyTypes = await PropertyType.findAll({ transaction: t });
    const listingTypes = await ListingType.findAll({ transaction: t });
    for (let i = 0; i < adsToCreate; i++) {
      const newAd = await Ad.create(
        {
          title: `Ad ${i}`,
          description: `Description for ad ${i}`,
          price: (Math.random() * 100000 + 300).toFixed(2),
          propertyType:
            propertyTypes[
              Math.floor(Math.random() * propertyTypes.length)
            ].getDataValue("name"),
          listingType:
            listingTypes[
              Math.floor(Math.random() * listingTypes.length)
            ].getDataValue("name"),
          address: `Address for ad ${i}`,
          bedrooms: Math.floor(Math.floor(Math.random() * 5) + 2),
          bathrooms: Math.floor(Math.floor(Math.random() * 5) + 2),
          area: Math.floor(Math.floor(Math.random() * 1000) + 100),
          userId:
            users[Math.floor(Math.random() * users.length)].getDataValue("id"),
          placeId: `placeId${i}`,
        },
        { transaction: t }
      );

      const imagesCount = Math.floor(Math.random() * 3) + 1;

      const images = [
        ...(await searchPhotos("house", imagesCount)),
        ...(await searchPhotos("inside of house", imagesCount - 1)),
      ];

      await Image.bulkCreate(
        images.map((image: any) => ({
          width: image.width,
          height: image.height,
          url: image.src.original,
          alt: image.alt,
          adId: newAd.id,
        })),
        { transaction: t }
      );
    }
    await t.commit();
  } catch (error) {
    await t.rollback();
  }
}
