import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Utilisateur", () => {
  it("crée un utilisateur", async () => {
    const user = await prisma.utilisateur.create({
      data: {
        nom: "Doe",
        prenom: "John",
        mail: "john@example.com",
        mot_de_passe: "123456",
        date_de_naissance: new Date("2000-01-01"),
        tel: "0123456789",
      },
    });

    expect(user.mail).toBe("john@example.com");
  });
});
