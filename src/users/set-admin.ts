import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setAdmin(email: string) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
    });
    console.log(`User ${user.email} is now an admin.`);
  } catch (error) {
    console.error('Error setting admin role:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Replace with the email of the user you want to set as admin
const adminEmail = 'dkassa253@gmail.com';
setAdmin(adminEmail);