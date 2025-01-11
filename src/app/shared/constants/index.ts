export const ITEMTYPES = {
  PIZZA: 'PIZZA',
  MOMO: 'MOMO',
  CHINESE: 'CHINESE',
  BURGER: 'BURGER',
  SHAKE: 'SHAKE',
  CHAAP: 'CHAAP',
  OTHER: 'OTHER',
} as const;

export const CATEGORYTYPES: { cNAME: string; cVALUE: string }[] = [
  { cNAME: 'PIZZA', cVALUE: 'PIZZA' },
  { cNAME: 'MOMO', cVALUE: 'MOMO' },
  { cNAME: 'CHINESE', cVALUE: 'CHINESE' },
  { cNAME: 'BURGER', cVALUE: 'BURGER' },
  { cNAME: 'SHAKE', cVALUE: 'SHAKE' },
  { cNAME: 'CHAAP', cVALUE: 'CHAAP' },
  { cNAME: 'OTHER', cVALUE: 'OTHER' },
] as const;
