export enum EPlan {
  STANDARD = 'standard',
  ADVANCED = 'advanced',
  PREMIUM = 'premium',
}

export type TPlan = {
  label: string;
  demand: string;
  price: number;
  type: EPlan;
  size: number;
};

export const plans = [
  {
    label: 'STANDARD',
    demand: 'For personal use, use for little storage course content',
    price: 10,
    type: EPlan.STANDARD,
    size: 10,
  },
  {
    label: 'ADVANCED',
    demand: 'Suitable for long-term storage needs or large projects.',
    price: 18,
    type: EPlan.ADVANCED,
    size: 20,
  },
  {
    label: 'PREMIUM',
    demand: 'For users who store many high quality video and photo files.',
    price: 45,
    type: EPlan.PREMIUM,
    size: 50,
  },
];
