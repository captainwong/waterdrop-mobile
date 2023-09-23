import { useEffect } from 'react';

/*
 * useMount
 * @description: React hook that runs a callback function on mount
 * @param {function} callback - Callback function to run on mount
 * @returns {void}
 */
const useMount = (callback: () => void): void => {
  useEffect(() => {
    callback?.();
  }, []);
};

export default useMount;
