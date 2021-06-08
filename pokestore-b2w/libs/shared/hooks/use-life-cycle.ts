import { EffectCallback, useEffect, useRef } from 'react';

export const useComponentWillMount = (func: () => any) => {
  const willMount = useRef(true);

  if (willMount.current) func();

  willMount.current = false;
};

export const useComponentDidMount = (func: EffectCallback) =>
  useEffect(func, []);
