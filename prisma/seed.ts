import { Prisma,PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const superheroData: Prisma.SuperheroCreateInput[] = [
  {
    nickname: 'Spider-Man',
    real_name: 'Peter Parker',
    origin_description:
      'Spider-Man is a fictional superhero who first appeared in comic books published by Marvel Comics. He is also known as Peter Parker, a high school student who gained spider-like abilities after being bitten by a radioactive spider. Spider-Man possesses superhuman strength, agility, and the ability to cling to walls. He uses his powers to protect New York City from various threats, while also facing personal challenges in his dual life',
    superpowers:
      'Spider-Man has the proportionate strength, speed, and agility of a spider. He can stick to walls, has a sixth sense for danger (Spider-Sense), and is an expert in hand-to-hand combat',
    catch_phrase: 'With great power comes great responsibility',
    images: [],
  },
  {
    nickname: 'Spider-Man',
    real_name: 'Peter Parker',
    origin_description:
      'Spider-Man is a fictional superhero who first appeared in comic books published by Marvel Comics. He is also known as Peter Parker, a high school student who gained spider-like abilities after being bitten by a radioactive spider. Spider-Man possesses superhuman strength, agility, and the ability to cling to walls. He uses his powers to protect New York City from various threats, while also facing personal challenges in his dual life',
    superpowers:
      'Spider-Man has the proportionate strength, speed, and agility of a spider. He can stick to walls, has a sixth sense for danger (Spider-Sense), and is an expert in hand-to-hand combat',
    catch_phrase: 'With great power comes great responsibility',
    images: [],
  },
  {
    nickname: 'Batman',
    real_name: 'Bruce Wayne',
    origin_description:
      'Batman is a fictional superhero who first appeared in comic books published by DC Comics. He is also known as Bruce Wayne, a wealthy businessman who witnessed the murder of his parents as a child and dedicated his life to fighting crime. Batman utilizes his intellect, physical prowess, and a vast array of gadgets to protect Gotham City from its villains, all while maintaining a secret identity.',
    superpowers:
      'He relies on his extraordinary intelligence, detective skills, physical strength, agility, and martial arts training to fight crime. ',
    catch_phrase: "I'm Batman",
    images: [],
  },
];

async function main() {
  console.log(`Start seeding ...`)
  for (const u of superheroData) {
    const superhero = await prisma.superhero.create({
      data: u,
    })
    console.log(`Created superhero with id: ${superhero.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
