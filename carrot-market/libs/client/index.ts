import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

client.user.create({
  data: {
    name: 'user1',
    email: 'user1@gmail.com',
  },
});
