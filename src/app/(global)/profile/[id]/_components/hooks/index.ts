import { uploadAvatar } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useUploadAvatar = () =>
  useMutation({
    mutationFn: uploadAvatar,
  });
