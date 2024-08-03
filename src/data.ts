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
      small: 69,
      medium: 139,
      large: 199,
    },
    description:
      'Enjoy the vibrant flavoA simple yet classic delight with fresh tomatoes perfect for a light and flavorful bite..',
    imagePath: 'path-to-image-1.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Onion Pizza',
    price: {
      small: 79,
      medium: 159,
      large: 219,
    },
    description:
      'Enjoy the vibrant flavor of Onion & Amul Mozzarella creating a balanced and delicious pizza experience...',
    imagePath: 'path-to-image-2.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Capsicum Pizza',
    price: {
      small: 89,
      medium: 179,
      large: 249,
    },
    description:
      'Enjoy the vibrant flavor of capsicum, creating a balanced and delicious pizza experience with Amul Mozzarella.Amul Mozzarella cheese...',
    imagePath: 'path-to-image-3.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Corn Pizza',
    price: {
      small: 99,
      medium: 199,
      large: 269,
    },
    description:
      'Perfect for cheese Enjoy the sweet crunch of corn paired with Amul Mozzarella cheese creating a balanced and delicious pizza experience....',
    imagePath: 'path-to-image-3.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Paneer Pizza',
    price: {
      small: 119,
      medium: 219,
      large: 329,
    },
    description:
      'Indulge in the rich taste of marinated paneer cubes, bringing a burst of Indian flavor to every slice.',
    imagePath: 'path-to-image-3.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Margherita Pizza',
    price: {
      small: 129,
      medium: 249,
      large: 309,
    },
    description:
      'A timeless favorite, topped with generous amounts of gooey Mozzarella cheese for a classic Italian experience with an Indian twist.',
    imagePath: 'path-to-image-3.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Veg Pizza',
    price: {
      small: 139,
      medium: 259,
      large: 389,
    },
    description:
      'Loaded with a variety of fresh vegetables, this pizza is a colorful and nutritious option for veggie lovers.',
    imagePath: 'path-to-image-3.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Veg Corn Pizza',
    price: {
      small: 149,
      medium: 279,
      large: 409,
    },
    description:
      'Sweet corn kernels combined with a medley of vegetables make this pizza a delightful and satisfying choice.',
    imagePath: 'path-to-image-3.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Veg Paneer Pizza',
    price: {
      small: 159,
      medium: 299,
      large: 429,
    },
    description:
      'A perfect blend of veggies and marinated paneer, this pizza offers a rich and hearty flavor in every bite.',
    imagePath: 'path-to-image-3.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Peppy Paneer Pizza',
    price: {
      small: 169,
      medium: 319,
      large: 449,
    },
    description:
      'Spice up your meal with peppy paneer, featuring zesty seasonings, capsicum, red paprika and tangy paneer that excite your taste buds.',
    imagePath: 'path-to-image-3.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Farmhouse Pizza',
    price: {
      small: 179,
      medium: 329,
      large: 479,
    },
    description:
      'Experience the goodness of the farm with this pizza, loaded with fresh onions, tomatoes, capsicum, paneer and mushrooms.',
    imagePath: 'path-to-image-3.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Makhani Pizza',
    price: {
      small: 189,
      medium: 339,
      large: 499,
    },
    description:
      'Relish the creamy and tangy flavors of makhani sauce topped with onions, capsicum, paneer and red pepper bringing the taste of India to your plate.',
    imagePath: 'path-to-image-3.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Tandoori Pizza',
    price: {
      small: 199,
      medium: 349,
      large: 509,
    },
    description:
      'A bold and flavorful choice, featuring tandoori spiced toppings like onions, tomatoes, capsicum, paneer and red paprika that give a smoky and aromatic touch to your pizza.',
    imagePath: 'path-to-image-3.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Supreme Pizza',
    price: {
      small: 209,
      medium: 369,
      large: 529,
    },
    description:
      'A supreme combination of all the finest toppings, offering a rich and indulgent pizza experience with a variety of flavors in every bite.',
    imagePath: 'path-to-image-3.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Veg Extra Vaganza',
    price: {
      small: 219,
      medium: 389,
      large: 549,
    },
    description:
      'An extravagant mixed of vegetables, including onions, tomatoes, capsicum, corn, mushrooms, black olives, green olives and jalapenos, this pizza is a feast for the senses, packed with fresh and vibrant flavors...',
    imagePath: 'path-to-image-3.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Cheese Lover Pizza',
    price: {
      small: 249,
      medium: 399,
      large: 599,
    },
    description:
      'For the ultimate cheese enthusiast, this pizza is loaded with multiple layers of gooey and melty cheese making it a true indulgence...',
    imagePath: 'path-to-image-3.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
];

export const MOMO_ITEMS: MomoItem[] = [
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Veg Momo',
    price: {
      half: 50,
      full: 80,
    },
    description:
      'Delicious steamed momos serve with 4 dips (Chilli,Mayo,Mint & Tandoori dip) filled with fresh vegetables...',
    imagePath: 'path-to-imagePath-4.jpg',
    quantity: 0,
    itemType: ITEMTYPES.MOMO,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Kurkure Momo',
    price: {
      half: 80,
      full: 120,
    },
    description:
      'Served with 4 dips chilli, mint, mayo, tandoori masala,Our best selling kurkure momos are most crunchy momo with corn flakes wrapping on it makes its test amazing you never jonna forget and stuffing of momos made with carrot, onion, cabbage and capsicum.',
    imagePath: 'path-to-imagePath-5.jpg',
    quantity: 0,
    itemType: ITEMTYPES.MOMO,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Cheese Gravy(spicy) Momo',
    price: {
      half: 100,
      full: 150,
    },
    description:
      'Momos Made with pizza pasta suace ,cheese blend & mozzerella and olives & red paper baked at 297 with coal flavour',
    imagePath: 'path-to-imagePath-5.jpg',
    quantity: 0,
    itemType: ITEMTYPES.MOMO,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Cheese Baked Momo',
    price: {
      half: 110,
      full: 170,
    },
    description:
      'Momos Made with cheese blend , mozzerella and pizza toppings baked at 297 with coal flavour',
    imagePath: 'path-to-imagePath-5.jpg',
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
    price: 49,
    description:
      'delightful combination of onion, capsicum, aloo tikki and a creamy blend of Mayonnaise and burger sauce, all nestled in a soft burger bun with Amul cheese....',
    imagePath: 'path-to-imagePath-4.jpg',
    quantity: 0,
    itemType: ITEMTYPES.BURGER,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Veg Burger',
    price: 59,
    description:
      'Delight in our omfo momo veg burger, filled with onion, capsicum, tomato, aloo tikki and a luscious mixed of Mayonnaise and burger sauce, all embraced by a soft burger bun with Amul cheese..',
    imagePath: 'path-to-imagePath-5.jpg',
    quantity: 0,
    itemType: ITEMTYPES.BURGER,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Cheese Burger',
    price: 79,
    description:
      'Indulge in our omfo momo cheese burger, boasting a medley of onion, capsicum, tomato, paneer, aloo tikki, Mozzarella cheese and a rich combination of mayonnaise and burger sauce, hugged by a soft burger bun with Amul cheese.',
    imagePath: 'path-to-imagePath-5.jpg',
    quantity: 0,
    itemType: ITEMTYPES.BURGER,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Cheese Slice Burge',
    price: 99,
    description:
      'omfo momo cheese slice burger, packed with onion, capsicum, tomato, paneer, aloo tikki, Mozzarella cheese, a slice of cheese and a creamy blend of mayonnaise and burger sauce, all wrapped in a soft burger bun with Amul cheese.',
    imagePath: 'path-to-imagePath-5.jpg',
    quantity: 0,
    itemType: ITEMTYPES.BURGER,
  },
];

export const SHAKES_ITEMS: ShakeItem[] = [
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Oreo Shake',
    price: 49,
    description: '',
    imagePath: 'path-to-imagePath-4.jpg',
    quantity: 0,
    itemType: ITEMTYPES.SHAKE,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Kitkat Shake',
    price: 59,
    description: '',
    imagePath: 'path-to-imagePath-5.jpg',
    quantity: 0,
    itemType: ITEMTYPES.SHAKE,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Strawberry Shake',
    price: 79,
    description: '',
    imagePath: 'path-to-imagePath-5.jpg',
    quantity: 0,
    itemType: ITEMTYPES.SHAKE,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Butterscoth',
    price: 99,
    description: '',
    imagePath: 'path-to-imagePath-5.jpg',
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
