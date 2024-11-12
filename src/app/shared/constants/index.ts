export const ITEMTYPES = {
  PIZZA: 'PIZZA',
  MOMO: 'MOMO',
  CHINESE: 'CHINESE',
  BURGER: 'BURGER',
  SHAKE: 'SHAKE',
} as const;

export const CATEGORYTYPES: { cNAME: string; cVALUE: string }[] = [
  { cNAME: 'PIZZA', cVALUE: 'PIZZA' },
  { cNAME: 'MOMO', cVALUE: 'MOMO' },
  { cNAME: 'CHINESE', cVALUE: 'CHINESE' },
  { cNAME: 'BURGER', cVALUE: 'BURGER' },
  { cNAME: 'SHAKE', cVALUE: 'SHAKE' },
] as const;
