import axios from 'axios';

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

export const getVideo = (id?: string): Promise<string> =>
  api.get(`/videos/${id}`);

export const deleteVideo = (id?: string) => api.delete(`/lesson-videos/${id}`);

export const uploadVideo = async (
  video: File,
  setProgress: (progress: number) => void
): Promise<File & { duration: number; videoId: string }> => {
  const formData = new FormData();
  formData.append('video', video);

  const result = await axios.post(
    process.env.NEXT_PUBLIC_VIDEO_URL ?? '',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) =>
        setProgress(
          Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1))
        ),
    }
  );
  return result.data;
};
