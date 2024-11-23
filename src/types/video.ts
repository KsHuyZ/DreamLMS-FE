export type TVideoCredentials = {
  title: string;
  video?: File;
  lessonId: string;
  description: string;
  duration?: number;
  isFree?: boolean;
  size: number;
};

export type TVideo = {
  id: string;
} & TVideoCredentials;
