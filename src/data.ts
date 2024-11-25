import { ITEMTYPES } from './app/shared/constants';
import {
  BurgerItem,
  ChineseItem,
  MomoItem,
  OmfoMomoItems,
  PizzaItem,
  ShakeItem,
} from './app/shared/modals';

export const PIZZA_ITEMS: PizzaItem[] = [
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Tomato Pizza',
    price: {
      small: 110,
      medium: 210,
      large: 320,
    },
    description:
      'Enjoy the vibrant flavoA simple yet classic delight with fresh tomatoes perfect for a light and flavorful bite..',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Onion Pizza',
    price: {
      small: 110,
      medium: 210,
      large: 320,
    },
    description:
      'Enjoy the vibrant flavor of Onion & Amul Mozzarella creating a balanced and delicious pizza experience...',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Capsicum Pizza',
    price: {
      small: 110,
      medium: 210,
      large: 320,
    },
    description:
      'Enjoy the vibrant flavor of capsicum, creating a balanced and delicious pizza experience with Amul Mozzarella.Amul Mozzarella cheese...',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Corn Pizza',
    price: {
      small: 110,
      medium: 210,
      large: 320,
    },
    description:
      'Perfect for cheese Enjoy the sweet crunch of corn paired with Amul Mozzarella cheese creating a balanced and delicious pizza experience....',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Paneer Pizza',
    price: {
      small: 170,
      medium: 330,
      large: 500,
    },
    description:
      'Indulge in the rich taste of marinated paneer cubes, bringing a burst of Indian flavor to every slice.',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Margherita Pizza',
    price: {
      small: 170,
      medium: 330,
      large: 500,
    },
    description:
      'A timeless favorite, topped with generous amounts of gooey Mozzarella cheese for a classic Italian experience with an Indian twist.',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Veg Pizza',
    price: {
      small: 190,
      medium: 370,
      large: 560,
    },
    description:
      'Loaded with a variety of fresh vegetables, this pizza is a colorful and nutritious option for veggie lovers.',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Veg Corn Pizza',
    price: {
      small: 210,
      medium: 410,
      large: 620,
    },
    description:
      'Sweet corn kernels combined with a medley of vegetables make this pizza a delightful and satisfying choice.',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Veg Paneer Pizza',
    price: {
      small: 220,
      medium: 430,
      large: 650,
    },
    description:
      'A perfect blend of veggies and marinated paneer, this pizza offers a rich and hearty flavor in every bite.',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Peppy Paneer Pizza',
    price: {
      small: 240,
      medium: 470,
      large: 710,
    },
    description:
      'Spice up your meal with peppy paneer, featuring zesty seasonings, capsicum, red paprika and tangy paneer that excite your taste buds.',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Farmhouse Pizza',
    price: {
      small: 240,
      medium: 470,
      large: 710,
    },
    description:
      'Experience the goodness of the farm with this pizza, loaded with fresh onions, tomatoes, capsicum, paneer and mushrooms.',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Makhani Pizza',
    price: {
      small: 260,
      medium: 510,
      large: 770,
    },
    description:
      'Relish the creamy and tangy flavors of makhani sauce topped with onions, capsicum, paneer and red pepper bringing the taste of India to your plate.',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Tandoori Pizza',
    price: {
      small: 270,
      medium: 530,
      large: 800,
    },
    description:
      'A bold and flavorful choice, featuring tandoori spiced toppings like onions, tomatoes, capsicum, paneer and red paprika that give a smoky and aromatic touch to your pizza.',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Supreme Pizza',
    price: {
      small: 270,
      medium: 530,
      large: 800,
    },
    description:
      'A supreme combination of all the finest toppings, offering a rich and indulgent pizza experience with a variety of flavors in every bite.',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Veg Extra Vaganza',
    price: {
      small: 300,
      medium: 590,
      large: 890,
    },
    description:
      'An extravagant mixed of vegetables, including onions, tomatoes, capsicum, corn, mushrooms, black olives, green olives and jalapenos, this pizza is a feast for the senses, packed with fresh and vibrant flavors...',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Cheese Lover Pizza',
    price: {
      small: 300,
      medium: 590,
      large: 890,
    },
    description:
      'For the ultimate cheese enthusiast, this pizza is loaded with multiple layers of gooey and melty cheese making it a true indulgence...',
    imagePath: '../../assets/images/PIZZA.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
];

export const MOMO_ITEMS: MomoItem[] = [
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Veg Momo',
    price: {
      half: 80,
      full: 120,
    },
    description:
      'Delicious steamed momos serve with 4 dips (Chilli,Mayo,Mint & Tandoori dip) filled with fresh vegetables...',
    imagePath: '../../assets/images/MOMO.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.MOMO,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Kurkure Momo',
    price: {
      half: 120,
      full: 180,
    },
    description:
      'Served with 4 dips chilli, mint, mayo, tandoori masala,Our best selling kurkure momos are most crunchy momo with corn flakes wrapping on it makes its test amazing you never jonna forget and stuffing of momos made with carrot, onion, cabbage and capsicum.',
    imagePath: '../../assets/images/KURKURE_MOMO.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.MOMO,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Cheese Gravy(spicy) Momo',
    price: {
      half: 150,
      full: 210,
    },
    description:
      'Momos Made with pizza pasta suace ,cheese blend & mozzerella and olives & red paper baked at 297 with coal flavour',
    imagePath: '../../assets/images/CHEESE_GRAVY_MOMO.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.MOMO,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Cheese Baked Momo',
    price: {
      half: 160,
      full: 240,
    },
    description:
      'Momos Made with cheese blend , mozzerella and pizza toppings baked at 297 with coal flavour',
    imagePath: '../../assets/images/CHEESE_BAKED_MOMO.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.MOMO,
  },
];

export const CHINESE_ITEM: ChineseItem[] = [
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Veg CHOW',
    price: {
      half: 21,
      full: 31,
    },
    description: 'Delicious steamed momos filled with fresh vegetables...',
    imagePath: 'path-to-image-4.jpg',
    quantity: 0,
    itemType: ITEMTYPES.CHINESE,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Chicken CHOW',
    price: {
      half: 41,
      full: 51,
    },
    description: 'Juicy chicken momos served with spicy chutney...',
    imagePath: 'path-to-image-5.jpg',
    quantity: 0,
    itemType: ITEMTYPES.CHINESE,
  },
];

export const BURGER_ITEMS: BurgerItem[] = [
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Classic Burger',
    price: 70,
    description:
      'delightful combination of onion, capsicum, aloo tikki and a creamy blend of Mayonnaise and burger sauce, all nestled in a soft burger bun with Amul cheese....',
    imagePath: '../../assets/images/CLASSIC_BURGER.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.BURGER,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Veg Burger',
    price: 90,
    description:
      'Delight in our omfo momo veg burger, filled with onion, capsicum, tomato, aloo tikki and a luscious mixed of Mayonnaise and burger sauce, all embraced by a soft burger bun with Amul cheese..',
    imagePath: '../../assets/images/VEG_BURGER.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.BURGER,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Cheese Burger',
    price: 110,
    description:
      'Indulge in our omfo momo cheese burger, boasting a medley of onion, capsicum, tomato, paneer, aloo tikki, Mozzarella cheese and a rich combination of mayonnaise and burger sauce, hugged by a soft burger bun with Amul cheese.',
    imagePath: '../../assets/images/CHEESE_BURGER.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.BURGER,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Cheese Slice Burge',
    price: 130,
    description:
      'omfo momo cheese slice burger, packed with onion, capsicum, tomato, paneer, aloo tikki, Mozzarella cheese, a slice of cheese and a creamy blend of mayonnaise and burger sauce, all wrapped in a soft burger bun with Amul cheese.',
    imagePath: '../../assets/images/CHEESE_SLICE_BURGER.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.BURGER,
  },
];

export const SHAKES_ITEMS: ShakeItem[] = [
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Oreo Shake',
    price: 99,
    description: '',
    imagePath: '../../assets/images/OREO_SHAKE.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.SHAKE,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Kitkat Shake',
    price: 109,
    description: '',
    imagePath: '../../assets/images/KITKAT_SHAKE.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.SHAKE,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Strawberry Shake',
    price: 119,
    description: '',
    imagePath: '../../assets/images/SHRAWBERRY_SHAKE.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.SHAKE,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Butterscoth',
    price: 129,
    description: '',
    imagePath: '../../assets/images/BUTTERSCOTH_SHAKE.jpeg',
    quantity: 0,
    itemType: ITEMTYPES.SHAKE,
  },
];

export const OMFO_MOMO_ITEMS: OmfoMomoItems = {
  pizzaItems: PIZZA_ITEMS,
  momosItems: MOMO_ITEMS,
  chineseItems: CHINESE_ITEM,
  burgerItems: BURGER_ITEMS,
  shakesItems: SHAKES_ITEMS,
};
