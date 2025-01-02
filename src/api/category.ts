import axios from '@/lib/api';

import { ICategory } from '@/types';

export const getCategoriesByName = (name: string): Promise<ICategory[]> =>
  axios.get(`/categories/${name}`);

export const getTopCategories = (): Promise<ICategory[]> =>
  axios.get('/categories/top');
