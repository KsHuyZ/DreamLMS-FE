import { z } from 'zod';

import { ELevel, TImage } from '@/types';

const ACCEPTED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-matroska',
];

export interface CreateCourseForm {
  name: string;
  description: string;
  shortDescription: string;
  tags: string[];
  categories: string[];
  price: number;
  image: File | TImage;
  level: ELevel;
}

export const courseInfoSchema = z.object({
  name: z.string({ required_error: 'Course name is require!' }).trim(),
  price: z.number().default(0),
  description: z
    .string({
      required_error: 'About course is require',
    })
    .trim(),
  shortDescription: z
    .string({
      required_error: 'Short description is required!',
    })
    .trim(),
  image: z.any(),
  tags: z.array(z.string()).min(0, 'Tag at lease one item!'),
  categories: z.array(z.string()).min(0, 'Category at lease one item!'),
  level: z.string().min(0, 'Level is require!'),
});

export const courseAdditionSchema = z.object({
  videoPreview: z.any(),
});

export const createVideoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  video: z.any().refine((file) => {
    return ACCEPTED_VIDEO_TYPES.includes(file?.type);
  }, 'Only .mp4, .webm formats are supported.'),
  isFree: z.boolean().default(false),
});

export const deleteCourseSchema = z.object({
  name: z.string(),
});
