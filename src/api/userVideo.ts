import api from '@/lib/api';

export const completeVideo = (id?: string) => api.post(`/user-videos/${id}`);
