import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    nickname: 'Superman',
    real_name: 'Clark Kent',
    origin_description:
      'Superman is a fictional superhero who first appeared in comic books published by DC Comics. He is also known as Clark Kent, an alien from the planet Krypton who was sent to Earth as a baby. As he grew up, he discovered his extraordinary abilities, including superhuman strength, speed, and the ability to fly. Superman uses his powers to protect the innocent and fight against evil, becoming a symbol of hope and justice.',
    superpowers:
      'His superpowers include superhuman strength, invulnerability, flight, heat vision, and freeze breath. He also possesses heightened senses and the ability to move and react at superhuman speeds.',
    catch_phrase: 'Truth, justice, and the American way!',
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
  {
    nickname: 'Wonder Woman',
    real_name: 'Diana Prince',
    origin_description:
      'Wonder Woman is a fictional superhero who first appeared in comic books published by DC Comics. She is an Amazon princess, gifted with superhuman powers by the Greek gods. Wonder Woman fights for justice, peace, and gender equality, using her strength, agility, and magical weapons like the Lasso of Truth and indestructible bracelets.',
    superpowers:
      'She possesses superhuman strength, speed, agility, durability, and the power of flight. She is also a skilled hand-to-hand combatant and has access to various magical artifacts.',
    catch_phrase: 'I am Diana, Princess of the Amazons!',
    images: [],
  },
  {
    nickname: 'The Flash',
    real_name: 'Barry Allen',
    origin_description:
      'The Flash is a fictional superhero who first appeared in comic books published by DC Comics. Barry Allen, a forensic scientist, gained his superhuman speed after being struck by lightning and bathed in chemicals. The Flash uses his speed to protect Central City and fight against crime and various metahuman threats.',
    superpowers:
      'His power is superhuman speed, which allows him to move at incredible velocities, vibrate through solid objects, and generate lightning bolts. He also possesses enhanced reflexes and an accelerated healing factor.',
    catch_phrase: 'I am the fastest man alive!',
    images: [],
  },
  {
    nickname: 'Green Lantern',
    real_name: 'Hal Jordan',
    origin_description:
      'Green Lantern is a fictional superhero who first appeared in comic books published by DC Comics. Hal Jordan is a test pilot who was chosen by the Guardians of the Universe to be a member of the Green Lantern Corps, an intergalactic police force. As Green Lantern, Hal wields a power ring that grants him the ability to create solid constructs and harness the green energy of willpower.',
    superpowers:
      'With his power ring, he can create virtually anything he imagines, limited only by his willpower and imagination. He can also fly, generate force fields, and translate languages.',
    catch_phrase:
      'In brightest day, in blackest night, no evil shall escape my sight!',
    images: [],
  },
  {
    nickname: 'Aquaman',
    real_name: 'Arthur Curry',
    origin_description:
      'Aquaman is a fictional superhero who first appeared in comic books published by DC Comics. He is also known as Arthur Curry, the rightful heir to the throne of Atlantis. Aquaman possesses the ability to communicate with sea creatures, superhuman strength, and the power to manipulate water. He defends the oceans and protects the world from both terrestrial and marine threats.',
    superpowers:
      'His superhuman abilities include enhanced strength, speed, endurance, and the ability to breathe underwater. He can also command marine life and swim at incredible speeds.',
    catch_phrase: 'I am the protector of the deep!',
    images: [],
  },
  {
    nickname: 'Green Arrow',
    real_name: 'Oliver Queen',
    origin_description:
      'Green Arrow is a fictional superhero who first appeared in comic books published by DC Comics. Oliver Queen is a billionaire playboy who becomes a skilled archer and vigilante after being stranded on a deserted island. Green Arrow fights against corruption and injustice, using his exceptional archery skills and a wide array of arrows and gadgets.',
    superpowers:
      'While Green Arrow doesn’t possess superhuman powers, he is an exceptional archer with perfect aim. He is highly skilled in hand-to-hand combat and is an expert marksman.',
    catch_phrase: 'You have failed this city!',
    images: [],
  },
  {
    nickname: 'Iron Man',
    real_name: 'Tony Stark',
    origin_description:
      'Iron Man is a fictional superhero who first appeared in comic books published by Marvel Comics. Tony Stark, a genius billionaire inventor, created a powered suit of armor to save his own life and fight against threats as Iron Man. He uses his intellect and advanced technology to protect the world as a superhero and a member of the Avengers.',
    superpowers:
      "His suit of armor grants him superhuman strength, flight, and an array of weapons and gadgets. Tony Stark's genius-level intellect also allows him to develop innovative technology.",
    catch_phrase: 'I am Iron Man',
    images: [],
  },
  {
    nickname: 'Captain America',
    real_name: 'Steve Rogers',
    origin_description:
      'Captain America is a fictional superhero who first appeared in comic books published by Marvel Comics. Steve Rogers, a frail young man, volunteered for an experiment that transformed him into a super-soldier. As Captain America, he fights for justice, freedom, and the ideals of America, wielding his shield as a symbol of resilience and righteousness.',
    superpowers:
      'He possesses enhanced strength, speed, agility, durability, and accelerated healing. Captain America is also an expert hand-to-hand combatant and a master tactician.',
    catch_phrase: 'I can do this all day!',
    images: [],
  },
  {
    nickname: 'Thor',
    real_name: 'Thor Odinson',
    origin_description:
      'Thor is a fictional superhero who first appeared in comic books published by Marvel Comics. He is the Norse god of thunder and a member of the superhero team, the Avengers. Thor wields the enchanted hammer Mjolnir, which grants him the ability to control lightning and access his full power as the God of Thunder.',
    superpowers:
      'He possesses superhuman strength, endurance, and longevity. With Mjolnir, he can summon lightning, fly, and manipulate weather patterns. Thor is also a formidable warrior skilled in both armed and unarmed combat.',
    catch_phrase: 'I am Thor, the God of Thunder!',
    images: [],
  },
  {
    nickname: 'Hulk',
    real_name: 'Bruce Banner',
    origin_description:
      'Hulk is a fictional superhero who first appeared in comic books published by Marvel Comics. Dr. Bruce Banner, a brilliant scientist, was exposed to gamma radiation, which caused him to transform into the green-skinned, superhuman creature known as the Hulk whenever he becomes angry or emotionally stressed.',
    superpowers:
      "The Hulk possesses immense superhuman strength and durability. As the Hulk, Bruce Banner's strength increases proportionally with his level of anger, making him one of the most powerful beings in the Marvel Universe.",
    catch_phrase: 'Hulk smash!',
    images: [],
  },
  {
    nickname: 'Black Widow',
    real_name: 'Natasha Romanoff',
    origin_description:
      'Black Widow is a fictional superhero who first appeared in comic books published by Marvel Comics. Natasha Romanoff, also known as Natalia Romanova, is a highly trained spy and assassin. She is a skilled martial artist, marksman, and master of disguise, using her expertise to fight against espionage and terrorism.',
    superpowers:
      'Although she does not possess superhuman powers, Black Widow is a master in various forms of combat and espionage. She is highly skilled in hand-to-hand combat, acrobatics, and the use of various weapons and gadgets.',
    catch_phrase: 'I’m always picking up after you boys!',
    images: [],
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of superheroData) {
    const superhero = await prisma.superhero.create({
      data: u,
    });
    console.log(`Created superhero with id: ${superhero.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
