/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from 'react';

const API_URL = 'http://localhost:3001';

const request = async (path, signal) => {
  const res = await fetch(`${API_URL}${path}`, {
    signal,
  });
  
  return {
    data: await res.json(),
    headers: res.headers,
  };
};

/**
 *
 * @param {string| function } path
 * @param {Function} [cb]
 *
 */
function useRequest(path, cb) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const abortController = useRef(null);

  const handleRequest = async () => {
    setLoading(true);
    abortController.current = new AbortController();
    try {
      const { data: responseData, headers } = await request(path, abortController.current.signal);
      setData(responseData);
      if (headers.has('X-Total-Count')) {
        setTotal(Number(headers.get('X-Total-Count')));
      }
      if (cb) {
        cb();
      }
    } catch (e) {
      console.log('Run yarn movie-api for fake api');
    }
    setLoading(false);
  };

  useEffect(() => {
    handleRequest();
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [path]);

  return {
    loading,
    data,
    total,
  };
}

export default useRequest;
