import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

async function main() {
    // await prisma.user.deleteMany({});
    // await prisma.event.deleteMany({});
    // await prisma.organization.deleteMany({});
    // const user = await prisma.user.createMany({
    //     data: [
    //         {firstName: 'Anna1', lastName: "Wilson", email: 'anna1@gmail.com', password: 'pwd1', phone: '0922222221', status: 'ACTIVE', city: "Hanoi", country: "Vietnam"},
    //         {firstName: 'Anna1', lastName: "Wilson", email: 'anna2@gmail.com', password: 'pwd1', phone: '0922222221', status: 'ACTIVE', city: "Hanoi", country: "Vietnam"},
    //         {firstName: 'Anna1', lastName: "Wilson", email: 'anna3@gmail.com', password: 'pwd1', phone: '0922222221', status: 'ACTIVE', city: "Hanoi", country: "Vietnam"},
    //         {firstName: 'Anna1', lastName: "Wilson", email: 'anna4@gmail.com', password: 'pwd1', phone: '0922222221', status: 'ACTIVE', city: "Hanoi", country: "Vietnam"},
    //     ]
    // });
    // const user1 = await prisma.user.findUnique({
    //     where: {
    //         email: "anna1@gmail.com"
    //     }
    // })
    // const organization = await prisma.organization.create({
    //     data: {
    //         name: 'Organization1',
    //         description: 'Description1',
    //         phone: '012222222',
    //         email: 'Organization1@gmail.com',
    //         userId: user1.id
    //     }
    // })
    // const event = await prisma.event.createMany({
    //     data: [
    //         {
    //           name: 'Event1', locationType: 'ONLINE', city: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id,
    //           country: "",
    //           isRequireApproval: false,
    //           isWaitlist: false,
    //           timeZone: "",
    //           theme: "BLACK"
    //         },
    //         {
    //           name: 'Event2', locationType: 'ONLINE', city: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id,
    //           country: "",
    //           isRequireApproval: false,
    //           isWaitlist: false,
    //           timeZone: "",
    //           theme: "BLACK"
    //         },
    //         {
    //           name: 'Event2', locationType: 'ONLINE', city: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id,
    //           country: "",
    //           isRequireApproval: false,
    //           isWaitlist: false,
    //           timeZone: "",
    //           theme: "BLACK"
    //         },
    //         {
    //           name: 'Event2', locationType: 'ONLINE', city: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id,
    //           country: "",
    //           isRequireApproval: false,
    //           isWaitlist: false,
    //           timeZone: "",
    //           theme: "BLACK"
    //         },
    //         {
    //           name: 'Event2', locationType: 'ONLINE', city: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id,
    //           country: "",
    //           isRequireApproval: false,
    //           isWaitlist: false,
    //           timeZone: "",
    //           theme: "BLACK"
    //         },
    //         {
    //           name: 'Event2', locationType: 'ONLINE', city: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id,
    //           country: "",
    //           isRequireApproval: false,
    //           isWaitlist: false,
    //           timeZone: "",
    //           theme: "BLACK"
    //         },
    //         {
    //           name: 'Event2', locationType: 'ONLINE', city: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id,
    //           country: "",
    //           isRequireApproval: false,
    //           isWaitlist: false,
    //           timeZone: "",
    //           theme: "BLACK"
    //         },
    //         {
    //           name: 'Event2', locationType: 'ONLINE', city: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id,
    //           country: "",
    //           isRequireApproval: false,
    //           isWaitlist: false,
    //           timeZone: "",
    //           theme: "BLACK"
    //         },
    //         {
    //           name: 'Event2', locationType: 'ONLINE', city: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id,
    //           country: "",
    //           isRequireApproval: false,
    //           isWaitlist: false,
    //           timeZone: "",
    //           theme: "BLACK"
    //         },
    //         {
    //           name: 'Event2', locationType: 'ONLINE', city: 'Microsoft Teams', description: 'description1', startDate: new Date(2023, 6, 1), endDate: new Date(2023, 6, 2), status: 'ACTIVE', userId: user1.id,
    //           country: "",
    //           isRequireApproval: false,
    //           isWaitlist: false,
    //           timeZone: "",
    //           theme: "BLACK"
    //         },
    //     ]
    // });
    // console.log(user, event, organization)
};

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });