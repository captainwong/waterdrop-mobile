import { useRef } from 'react';

/*
* useLatest
* @description: React hook that returns the latest value of a variable
* @param {any} value - Value to return
* @returns {any} - Latest value of the variable
*/
const useLatest = <T>(value: T) => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

export default useLatest;
