'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Organizations",
      [
        {
          name: "Umbrella Corporation",
          image: "https://ih1.redbubble.net/image.803147278.2191/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
          phone: "(417) 668-1968",
          address: "Raccoon City, MO 68168",
          welcomeText: "Our business is life itself.",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          facebook: "???",
          linkedin: "???",
          instagram: "???",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
