export const groupBy = (items: any[], key: string): Record<any, any> =>
  items.reduce((accumulation, currentValue) => {
    return {
      ...accumulation,
      [currentValue[key]]: [
        ...(accumulation[currentValue[key]] || []),
        currentValue,
      ],
    };
  }, {});
