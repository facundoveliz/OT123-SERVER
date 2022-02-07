'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Usuario',
          lastName: 'Demo',
          email: 'test@test.com',
          password: '$2a$10$4hVG5w2RMM.P0ST64W2qC.jlrIaq7W09oTOwEq.UqxQ1vDZmaoaja', // password: 123456789
          roleId: 1,
          image: 'https://randomuser.me/api/portraits/women/1.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Maria',
          lastName: 'Irola',
          email: 'mariaIrola@admin.com',
          password: '$2a$10$4hVG5w2RMM.P0ST64W2qC.jlrIaq7W09oTOwEq.UqxQ1vDZmaoaja', // password: 123456789
          roleId: 1,
          image: 'https://randomuser.me/api/portraits/women/2.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Marita',
          lastName: 'Gomez',
          email: 'marita@admin.com',
          password: '$2a$10$4hVG5w2RMM.P0ST64W2qC.jlrIaq7W09oTOwEq.UqxQ1vDZmaoaja', // password: 123456789
          roleId: 1,
          image: 'https://randomuser.me/api/portraits/women/3.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Miriam',
          lastName: 'Rodriguez',
          email: 'miriam@admin.com',
          password: '$2a$10$4hVG5w2RMM.P0ST64W2qC.jlrIaq7W09oTOwEq.UqxQ1vDZmaoaja', // password: 123456789
          roleId: 1,
          image: 'https://randomuser.me/api/portraits/women/4.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Cecilia',
          lastName: 'Mendez',
          email: 'Cecilia@admin.com',
          password: '$2a$10$mm6dh6W58JOXjA4cNDCVM.nvPo/LMZNLDxvKBU6b4CBrYIOnbhL0K', // password: MatiasPreiti1
          roleId: 1,
          image: 'https://randomuser.me/api/portraits/women/5.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Mario',
          lastName: 'Fuentes',
          email: 'Mariofuentes@admin.com',
          password: '$2a$10$mm6dh6W58JOXjA4cNDCVM.nvPo/LMZNLDxvKBU6b4CBrYIOnbhL0K', // password: MatiasPreiti1
          roleId: 1,
          image: 'https://randomuser.me/api/portraits/men/6.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Rodrigo',
          lastName: 'Fuente',
          email: 'rodrigofuente@admin.com',
          password: '$2a$10$ovls9PH5IndDgxX0ratSyuUGvAY2.n3yQU4GugRd86tH5wWdB6/ju', // password: IvanAchocalla1
          roleId: 1,
          image: 'https://randomuser.me/api/portraits/men/7.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Maria',
          lastName: 'Garcia',
          email: 'mariagarcia@admin.com',
          password: '$2a$10$ovls9PH5IndDgxX0ratSyuUGvAY2.n3yQU4GugRd86tH5wWdB6/ju', // password: IvanAchocalla1
          roleId: 1,
          image: 'https://randomuser.me/api/portraits/women/8.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Marco',
          lastName: 'Fernandez',
          email: 'marcofernandez@admin.com',
          password: '$2a$10$0Nf0VkJuuUsiror1w.T3BenJEmN2qzCLpOVVraabU02i0HlqNsPHm', // password: AgustinAvila1
          roleId: 1,
          image: 'https://randomuser.me/api/portraits/men/9.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Agustin',
          lastName: 'Palavecino',
          email: 'agustinpalavecino@admin.com',
          password: '$2a$10$0Nf0VkJuuUsiror1w.T3BenJEmN2qzCLpOVVraabU02i0HlqNsPHm', // password: AgustinAvila1
          roleId: 1,
          image: 'https://randomuser.me/api/portraits/men/10.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Enzo',
          lastName: 'Fernandez',
          email: 'enzofernandez@standard.com',
          password: '$2a$10$BY6s00NCzEtlKTP0kQdDquyz9GnsPU1VPtWNNzDUZBTnGrAh61kjK', // password: AlexisZacre1
          roleId: 2,
          image: 'https://randomuser.me/api/portraits/men/11.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Enzo',
          lastName: 'Perez',
          email: 'enzoperez@standar.com',
          password: '$2a$10$BY6s00NCzEtlKTP0kQdDquyz9GnsPU1VPtWNNzDUZBTnGrAh61kjK', // password: AlexisZacre1
          roleId: 2,
          image: 'https://randomuser.me/api/portraits/men/12.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Santiago',
          lastName: 'Simon',
          email: 'santiagosimon@standard.com',
          password: '$2a$10$Kz.GH5rUTt99J9uoJQ5kP.zGPrMLz9fr6qoINCe2sKlSqrW25Gif6', // password: JuanAlmazan1
          roleId: 2,
          image: 'https://randomuser.me/api/portraits/men/13.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Franco',
          lastName: 'Armani',
          email: 'francoarmani@standar.com',
          password: '$2a$10$Kz.GH5rUTt99J9uoJQ5kP.zGPrMLz9fr6qoINCe2sKlSqrW25Gif6', // password: JuanAlmazan1
          roleId: 2,
          image: 'https://randomuser.me/api/portraits/men/14.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Jorge',
          lastName: 'Carrascal',
          email: 'jorgecarrascal@standard.com',
          password: '$2a$10$vNWSVFPk8LVjGVAoaZZ4auFtzxyMCATQLaQ7hQjrJDorSlxZeazYW', // password: ManuelFrancisco1
          roleId: 2,
          image: 'https://randomuser.me/api/portraits/men/15.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Ignacio',
          lastName: 'Fernandez',
          email: 'ignaciofernandez@standar.com',
          password: '$2a$10$vNWSVFPk8LVjGVAoaZZ4auFtzxyMCATQLaQ7hQjrJDorSlxZeazYW', // password: ManuelFrancisco1
          roleId: 2,
          image: 'https://randomuser.me/api/portraits/men/16.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Marcelo',
          lastName: 'Gallardo',
          email: 'marcelogallardo@standard.com',
          password: '$2b$10$uEP32SA3zOTkI9Kdkz0HQeflVe0PELzmr4aq1uhfND8sxlUTXDqJy', // password: FranciscoOlivero1
          roleId: 2,
          image: 'https://randomuser.me/api/portraits/men/17.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Francisco',
          lastName: 'Olivero',
          email: 'FranciscoOlivero@admin.com',
          password: '$2b$10$uEP32SA3zOTkI9Kdkz0HQeflVe0PELzmr4aq1uhfND8sxlUTXDqJy', // password: FranciscoOlivero1
          roleId: 2,
          image: 'https://randomuser.me/api/portraits/men/18.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Federico',
          lastName: 'Girotti',
          email: 'federicogirotti@admin.com',
          password: '$2b$10$uEP32SA3zOTkI9Kdkz0HQeflVe0PELzmr4aq1uhfND8sxlUTXDqJy', // password: FedericoPalmari1
          roleId: 2,
          image: 'https://randomuser.me/api/portraits/men/19.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Julian',
          lastName: 'Alvares',
          email: 'julianalvares@standard.com',
          password: '$2b$10$uEP32SA3zOTkI9Kdkz0HQeflVe0PELzmr4aq1uhfND8sxlUTXDqJy', // password: FedericoPalmari1
          roleId: 2,
          image: 'https://randomuser.me/api/portraits/men/20.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
