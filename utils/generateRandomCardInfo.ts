const petsForCardInfo = [
  {
    image: require('@/assets/images/golden-pet.jpg'),
    title: 'Hey! soy Pyxie',
    gender: 'Hembra',
    breed: 'Golden',
    age: '9 meses',
  },
  {
    image: require('@/assets/images/charlie-pittbull.webp'),
    title: 'Hey! soy Charlie',
    gender: 'Macho',
    breed: 'Pitbull',
    age: '18 meses',
  },
  {
    image: require('@/assets/images/caniche.jpg'),
    title: 'Hey! soy Luna',
    gender: 'Hembra',
    breed: 'Random',
    age: '14 meses',
  },
  {
    image: require('@/assets/images/doberman.webp'),
    title: 'Hey! soy Fox',
    gender: 'Macho',
    breed: 'Doberman',
    age: '10 meses',
  },
  {
    image: require('@/assets/images/april.jpg'),
    title: 'Hey! soy April',
    gender: 'Hembra',
    breed: 'Pitbull',
    age: '20 meses',
  },
  {
    image: require('@/assets/images/buldog.webp'),
    title: 'Hey! soy Toto',
    gender: 'Macho',
    breed: 'Buldog',
    age: '13 meses',
  },
  {
    image: require('@/assets/images/chihuahua.jpg'),
    title: 'Hey! soy Tita',
    gender: 'Hembra',
    breed: 'Chihuahua',
    age: '36 meses',
  },
  {
    image: require('@/assets/images/rottwailer.webp'),
    title: 'Hey! soy Lucre',
    gender: 'Macho',
    breed: 'Rottweiler',
    age: '15 meses',
  },
  {
    image: require('@/assets/images/dogo.jpg'),
    title: 'Hey! soy Barkley',
    gender: 'Macho',
    breed: 'Dogo',
    age: '30 meses',
  },
  {
    image: require('@/assets/images/labradora.webp'),
    title: 'Hey! soy Opie',
    gender: 'Hembra',
    breed: 'Labrador',
    age: '8 meses',
  },
  {
    image: require('@/assets/images/chihuahua-rocky.webp'),
    title: 'Hey! soy Rocky',
    gender: 'Macho',
    breed: 'Chihuahua',
    age: '7 meses',
  },
  {
    image: require('@/assets/images/collie.webp'),
    title: 'Hey! soy Piper',
    gender: 'Macho',
    breed: 'Border Collie',
    age: '23 meses',
  },
];

export interface PetsForCardInfo {
  image: string;
  title: string;
  gender: string;
  breed: string;
  age: string;
}
export const getRandomCardInfo = () => {
  const number = Math.floor(Math.random() * petsForCardInfo.length);
  return petsForCardInfo[number];
};
