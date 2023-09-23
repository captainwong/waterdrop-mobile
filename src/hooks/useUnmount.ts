import { useEffect } from 'react';
import useLatest from './useLatest';

/*
 * useUnmount
 * @description: React hook that runs a callback function on unmount
 * @param {function} fn - Callback function to run on unmount
 * @returns {void}
 */
const useUnmount = (fn: () => void) => {
  const fnRef = useLatest(fn);
  useEffect(() => () => fnRef.current?.(), []);
};

export default useUnmount;
