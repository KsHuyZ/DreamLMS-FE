import { Options } from 'react-lottie';

export const congratulationsOptions: Options = {
  loop: false,
  autoplay: true,
  animationData: require('@/assets/json/confetti.json'),
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
