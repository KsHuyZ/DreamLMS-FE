export type TVideoCredentials = {
  title: string;
  video?: File;
  lessonId: string;
  description: string;
  duration?: number;
  isFree?: boolean;
};

export type TVideo = {
  id: string;
  order: number;
} & TVideoCredentials;
