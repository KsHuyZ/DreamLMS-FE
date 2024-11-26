import api from '@/lib/api';

import { TVideoCredentials } from '@/types';

export const createVideo = (
  video: TVideoCredentials,
  setProgress: (progress: number) => void
) => {
  const data = new FormData();
  data.append('title', video.title);
  data.append('video', video.video as Blob);
  data.append('lessonId', video.lessonId);
  data.append('description', video.description);
  data.append('isFree', video.isFree ? 'true' : 'false');
  return api.post('/lesson-videos', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) =>
      setProgress(
        Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1))
      ),
  });
};

export const getVideo = (id: string): Promise<string> =>
  api.get(`/videos/${id}`);
