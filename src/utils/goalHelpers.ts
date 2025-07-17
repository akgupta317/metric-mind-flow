
export const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'green';
    case 'paused':
      return 'orange';
    case 'completed':
      return 'blue';
    default:
      return 'default';
  }
};
