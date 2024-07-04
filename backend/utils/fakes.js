const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const connectDb = require('../utils/database'); 
const { UserModel, OrganizationModel } = require('../model/user-model'); 


const organizations = Array.from({ length: 10 }, (_, i) => ({
    org_id: i + 1,
    org_name: faker.company.name(),
}));

// Seed users
const users = Array.from({ length: 100 }, () => {
    const org = organizations[Math.floor(Math.random() * organizations.length)];
    const roleId = Math.random() < 0.2 ? 2 : 3; 
    return {
        user_id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        emailId: faker.internet.email(),
        role_name: roleId === 2 ? 'User' : 'Organisation',
        org_name: org.org_name,
        password: faker.internet.password(),    
        active: true,
        role_id: roleId,
        org_id: org.org_id,
    };
});

async function seedDatabase() {
    try {
        await connectDb();

        await OrganizationModel.deleteMany({});
        await UserModel.deleteMany({});

        await OrganizationModel.insertMany(organizations);
        await UserModel.insertMany(users);

        console.log('Database seeded successfully');
    } catch (err) {
        console.error('Error seeding database:', err.message);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();
