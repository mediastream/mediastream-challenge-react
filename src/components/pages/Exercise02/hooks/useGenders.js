import { useEffect, useState } from "react";

export const useGenders = () => {
  const [genders, setGenders] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/genres")
      .then((res) => res.json())
      .then(setGenders)
      .catch(() => alert("Failed to fetch genres"))
      .finally(() => setLoading(false));
  }, []);

  return { genders, isLoading };
};
