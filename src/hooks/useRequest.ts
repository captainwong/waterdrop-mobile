import { useCallback, useState } from 'react';
import useMount from './useMount';

interface IUseRequest {
  params: Record<string, string>;
  manual?: boolean;
  onSuccess?: (res: unknown) => void;
  onError?: (err: unknown) => void;
}

/*
* useRequest
* @description: React hook that runs a request
* @param {function} service - Request function to run
* @param {object} options - Options object
* @param {object} options.params - Params to pass to the request function
* @param {boolean} options.manual - Whether to manually run the request
* @param {function} options.onSuccess - Callback function to run on success
* @param {function} options.onError - Callback function to run on error
* @returns {object} - Object containing loading state, data, and run function
*/
const useRequest = (
  service: (params: Record<string, string>) => Promise<unknown>,
  options: IUseRequest,
) => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const init = useCallback((curParams: Record<string, string>) => {
    useMount(() => {
      setLoading(true);
      service(curParams).then((res) => {
        setData(res);
        setLoading(false);
        options.onSuccess?.(res);
      }).catch((error) => {
        setLoading(false);
        options.onError?.(error);
      });
    });
  }, [service]);

  useMount(() => {
    if (!options.manual) {
      init(options.params);
    }
  });

  const run = (runParams: Record<string, string>) => {
    init(runParams);
  };

  return { loading, data, run };
};

export default useRequest;
