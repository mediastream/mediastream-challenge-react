import { useCallback, useEffect, useState } from "react";

const useRequest = ({ request, initialData = [], payload }) => {
  const [data, setData] = useState(initialData);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRequest = useCallback(async () => {
    setLoading(true);
    setFetchCount((prevFetchCount) => prevFetchCount + 1);

    try {
      const response = await request(payload);
      const responseJson = await response.json();

      setData(responseJson);
    } catch (_error) {
      console.log("Run yarn movie-api for fake api");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  return [data, fetchCount, loading];
};

export default useRequest;
