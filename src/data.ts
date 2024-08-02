import { ITEMTYPES } from "./app/shared/constants";
import { ChineseItem, MomoItem, OmfoMomoItems, PizzaItem } from "./app/shared/modals";

export const PIZZA_ITEMS: PizzaItem[] = [
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Capsicum Pizza [8 inches]',
    price: {
      small: 51,
      medium: 71,
      large: 101,
    },
    description:
      'Enjoy the vibrant flavor of capsicum, creating a balanced and delicious pizza experience...',
    imagePath: 'path-to-image-1.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Corn Pizza [8 inches]',
    price: {
      small: 111,
      medium: 151,
      large: 201,
    },
    description:
      'Enjoy the sweet crunch of corn paired with Amul Mozzarella cheese creating a balanced and delicious pizza experience...',
    imagePath: 'path-to-image-2.jpg',
    quantity: 0,
    itemType: ITEMTYPES.PIZZA,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Cheese Lover Pizza [8 inches]',
    price: {
      small: 151,
      medium: 251,
      large: 551,
    },
    description:
      'Perfect for cheese lovers, this pizza is loaded with Amul Mozzarella cheese...',
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
      half: 59,
      full: 119,
    },
    description: 'Delicious steamed momos filled with fresh vegetables...',
    imagePath: 'path-to-imagePath-4.jpg',
    quantity: 0,
    itemType: ITEMTYPES.MOMO,
  },
  {
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Chicken Momo',
    price: {
      half: 69,
      full: 149,
    },
    description: 'Juicy chicken momos served with spicy chutney...',
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

export const OMFO_MOMO_ITEMS: OmfoMomoItems = {
  pizzaItems: PIZZA_ITEMS,
  momosItems: MOMO_ITEMS,
  chineseItems: CHINESE_ITEM,
};
