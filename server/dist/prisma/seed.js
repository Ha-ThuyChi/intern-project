"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient;
async function main() {
    await prisma.user.deleteMany({});
    await prisma.event.deleteMany({});
    await prisma.organization.deleteMany({});
    const user = await prisma.user.createMany({
        data: [
            { name: 'Anna1', email: 'anna1@gmail.com', password: 'pwd1', phone: '0922222221', status: 'ACTIVE' },
            { name: 'Anna2', email: 'anna2@gmail.com', password: 'pwd2', phone: '0922222222', status: 'ACTIVE' },
            { name: 'Anna3', email: 'anna3@gmail.com', password: 'pwd3', phone: '0922222223', status: 'ACTIVE' },
            { name: 'Anna4', email: 'anna4@gmail.com', password: 'pwd3', phone: '0922222223' },
        ]
    });
    const user1 = await prisma.user.findUnique({
        where: {
            email: "anna1@gmail.com"
        }
    });
    const organization = await prisma.organization.create({
        data: {
            name: 'Organization1',
            description: 'Description1',
            phone: '012222222',
            email: 'Organization1@gmail.com',
            userId: user1.id
        }
    });
    const event = await prisma.event.createMany({
        data: [
            { name: 'Event1', locationType: 'ONLINE', location: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id },
            { name: 'Event2', locationType: 'ONLINE', location: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id },
            { name: 'Event2', locationType: 'ONLINE', location: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id },
            { name: 'Event2', locationType: 'ONLINE', location: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id },
            { name: 'Event2', locationType: 'ONLINE', location: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id },
            { name: 'Event2', locationType: 'ONLINE', location: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id },
            { name: 'Event2', locationType: 'ONLINE', location: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id },
            { name: 'Event2', locationType: 'ONLINE', location: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id },
            { name: 'Event2', locationType: 'ONLINE', location: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id },
            { name: 'Event2', locationType: 'ONLINE', location: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id },
        ]
    });
    console.log(user, event, organization);
}
;
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map