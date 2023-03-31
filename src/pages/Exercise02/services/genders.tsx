import { API_URL } from '../../../utilities/constants';

export const getGenders = async () => {
  try {
    const resp = await fetch(`${API_URL}genres`);
    return await resp.json();
  } catch (error) {
    console.log('Run yarn movie-api for fake api', error);
  }
};
