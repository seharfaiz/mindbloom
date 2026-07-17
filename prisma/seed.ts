import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.dailyChallenge.upsert({
    where: { date: today },
    update: {},
    create: {
      date: today,
      title: "Take three slow breaths",
      description: "Pause wherever you are and take three slow, deliberate breaths.",
      category: "mindfulness",
    },
  });

  await prisma.achievement.upsert({
    where: { key: "first_checkin" },
    update: {},
    create: {
      key: "first_checkin",
      title: "First check-in",
      description: "Logged your very first mood check-in.",
      icon: "sparkles",
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
