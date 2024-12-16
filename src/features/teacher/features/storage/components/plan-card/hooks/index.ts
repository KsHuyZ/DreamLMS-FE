import { useMutation } from '@tanstack/react-query';

import { upgradeStorage } from '@/api';

export const useUpgradePlan = () => useMutation({ mutationFn: upgradeStorage });
