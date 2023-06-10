import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const generateInitData = async () => {
  // Check if there is data in the database
  const users = await prisma.user.findMany();
  if (users.length) {
    console.log('Init data already generated');
    process.exit(process.exitCode);
  }

  // Generate Salt
  const salt = await bcrypt.genSalt();

  // Create Roles
  const superAdminRole = await prisma.role.create({
    data: {
      name: 'Super Admin',
      allow_roles_view: true,
      allow_roles_operations: true,
      allow_posts_view: true,
      allow_posts_operations: true,
      allow_users_view: true,
      allow_users_operations: true,
      allow_categories_view: true,
      allow_categories_operations: true,
    },
  });

  await prisma.role.create({
    data: {
      name: 'Admin',
      allow_roles_view: true,
      allow_roles_operations: false,
      allow_posts_view: true,
      allow_posts_operations: true,
      allow_users_view: true,
      allow_users_operations: false,
      allow_categories_view: true,
      allow_categories_operations: true,
    },
  });

 await prisma.role.create({
    data: {
      name: 'User',
      allow_roles_view: false,
      allow_roles_operations: false,
      allow_posts_view: true,
      allow_posts_operations: false,
      allow_users_view: false,
      allow_users_operations: false,
      allow_categories_view: true,
      allow_categories_operations: false,
    },
  });

  // Create Admin User
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@admin.com',
      password: await bcrypt.hash('admin', salt),
      roleId: superAdminRole.id,
    },
  });

  console.log('Init data generated successfully');
  process.exit(process.exitCode);
};

generateInitData();
