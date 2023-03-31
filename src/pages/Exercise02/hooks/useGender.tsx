import { useEffect, useState } from 'react';
import { getGenders } from '../services/genders';

export const useGender = () => {
  const [genders, setGenders] = useState([]);

  const handleMovieGenders = async () => {
    const resp = await getGenders();
    setGenders(resp);
  };

  useEffect(() => {
    handleMovieGenders();
  }, []);

  return {
    genders
  };
};
