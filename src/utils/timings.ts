export const debounce = (func: any, delay: number) => {
  let inDebounce: any;
  return function (...args: any) {
    // @ts-ignore
    const context = this;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

export const throttle = (func: any, limit: number) => {
  let lastFunc: any;
  let lastRan: any;
  return function (...args: any) {
    // @ts-ignore
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
