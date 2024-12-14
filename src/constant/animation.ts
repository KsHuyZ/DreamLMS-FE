import { Options } from 'react-lottie';

export const congratulationsOptions: Options = {
  loop: false,
  autoplay: true,
  animationData: require('@/assets/json/confetti.json'),
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const runningOptions: Options = {
  loop: true,
  autoplay: true,
  animationData: require('@/assets/json/running.json'),
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
