const petsForCardInfo = [
  {
    image: require('@/assets/images/golden-pet.jpg'),
    title: 'Hey! soy Pyxie',
    gender: 'Hembra',
    breed: 'Golden',
    age: '9 meses',
  },
  {
    image: require('@/assets/images/golden-pet.jpg'),
    title: 'Hey! soy Charlie',
    gender: 'Macho',
    breed: 'Random',
    age: '18 meses',
  },
  {
    image: require('@/assets/images/golden-pet.jpg'),
    title: 'Hey! soy Luna',
    gender: 'Hembra',
    breed: 'Random',
    age: '24 meses',
  },
  {
    image: require('@/assets/images/golden-pet.jpg'),
    title: 'Hey! soy Fox',
    gender: 'Macho',
    breed: 'Random',
    age: '10 meses',
  },
  {
    image: require('@/assets/images/golden-pet.jpg'),
    title: 'Hey! soy April',
    gender: 'Hembra',
    breed: 'Pitbull',
    age: '26 meses',
  },
  {
    image: require('@/assets/images/golden-pet.jpg'),
    title: 'Hey! soy Toto',
    gender: 'Macho',
    breed: 'Buldog',
    age: '7 meses',
  },
  {
    image: require('@/assets/images/golden-pet.jpg'),
    title: 'Hey! soy Tita',
    gender: 'Hembra',
    breed: 'Chihuahua',
    age: '36 meses',
  },
  {
    image: require('@/assets/images/golden-pet.jpg'),
    title: 'Hey! soy Lucre',
    gender: 'Macho',
    breed: 'Pitbull',
    age: '23 meses',
  },
  {
    image: require('@/assets/images/golden-pet.jpg'),
    title: 'Hey! soy Barkley',
    gender: 'Macho',
    breed: 'Dogo',
    age: '30 meses',
  },
  {
    image: require('@/assets/images/golden-pet.jpg'),
    title: 'Hey! soy Opie',
    gender: 'Hembra',
    breed: 'Labrador',
    age: '12 meses',
  },
  {
    image: require('@/assets/images/golden-pet.jpg'),
    title: 'Hey! soy Rocky',
    gender: 'Macho',
    breed: 'Chihuahua',
    age: '15 meses',
  },
  {
    image: require('@/assets/images/golden-pet.jpg'),
    title: 'Hey! soy Piper',
    gender: 'Macho',
    breed: 'Collins',
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
