import { useState, useEffect } from "react";

const useApi = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3001/${endpoint}`);
        if (!response.ok) {
          throw new Error("Request api failed");
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError("Failed to fetch movies");
      }

      setIsLoading(false);
    };

    fetchData();
  }, [endpoint]);

  return { data, isLoading, error };
};

export default useApi;
