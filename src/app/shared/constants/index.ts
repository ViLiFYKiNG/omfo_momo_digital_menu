export const ITEMTYPES = {
  PIZZA: 'PIZZA',
  MOMO: 'MOMO',
  CHINESE: 'CHINESE',
  BURGER: 'BURGER',
  SHAKE: 'SHAKE', 
} as const;


export const EXTRA_PRICE = {
  small: {
    EXTRA_CHEESE: 40,
    CHEESE_BURST: 60,
  },
  medium: {
    EXTRA_CHEESE: 80,
    CHEESE_BURST: 100,
  },
  large: {
    EXTRA_CHEESE: 120,
    CHEESE_BURST: 150,
  },
} as const;
