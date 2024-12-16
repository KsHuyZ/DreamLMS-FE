export const formatPrice = (price?: number) => {
  if (!price) return 'Free';
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export const toTitleCase = (string: string) => {
  return string.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
  });
};

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export enum EDisk {
  GB = 'gb',
  TB = 'tb',
}

export const getTotalStorage = (totalStorage = 1, unit = EDisk.GB) => {
  if (unit === EDisk.GB) return totalStorage;
  return totalStorage * 1000;
};

export const convertByteToGB = (byte?: number) => {
  return byte ? byte / 1000000000 : 0;
};
