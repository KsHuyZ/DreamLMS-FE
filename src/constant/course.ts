import { ECourseDuration, ECourseRate, ELevel, EPayType } from '@/types';

export const levelOptions = [
  {
    id: ELevel.ALL,
    value: 'All Level',
  },
  {
    id: ELevel.BEGINNER,
    value: 'Beginner',
  },
  {
    id: ELevel.MIDDLE,
    value: 'Middle',
  },
  {
    id: ELevel.EXPERT,
    value: 'Expert',
  },
];

export const durationOptions = [
  {
    value: '0-1 Hour',
    id: ECourseDuration.LessThanOneHour,
  },
  {
    value: '1-3 Hours',
    id: ECourseDuration.OneToThreeHours,
  },
  {
    value: '3-6 Hours',
    id: ECourseDuration.ThreeToSixHours,
  },
  {
    value: '6-17 Hours',
    id: ECourseDuration.SixToSevenTeenHours,
  },
  {
    value: '> 17 Hours',
    id: ECourseDuration.MoreThanSevenTeenHours,
  },
];

export const paymentOptions = [
  { id: EPayType.Free, value: 'Free' },
  { id: EPayType.Paid, value: 'Paid' },
];

export const rateOptions = [
  {
    id: '',
    value: ECourseRate.OneStar,
  },
];
