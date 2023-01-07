import { hash } from "bcrypt";
import { randomUUID } from "crypto";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  await prisma.user.create({
    data: {
      id: randomUUID(),
      name: "user_admin",
      password: await hash("admin123", 8),
      avatar: "",
      driver_license: "00000",
      email: "admin@admin.com",
      isAdmin: true,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
