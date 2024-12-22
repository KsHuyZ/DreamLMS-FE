export const __mockChartCompleted = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 90],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};
export const __mockChartProgress = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 25, 40],
      fill: false,
      borderColor: 'rgb(220,20,60)',
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

export const __mockChartMonth = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 25, 40],
      fill: false,
      borderColor: 'rgb(5,135,67)',
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

export const __mockChartMonthOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

export const __mockChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
};
