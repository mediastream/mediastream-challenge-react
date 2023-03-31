import { API_URL } from 'utilities/constants';

export const getMovies = async (gender = '', order = '') => {
  const hasGender = gender === '' ? '' : `&genres_like=${gender}`;
  const hasOrder = order === '' ? '' : `&_sort=year&_order=${order}`;
  try {
    const resp = await fetch(`${API_URL}movies?_limit=50${hasGender}${hasOrder}`);
    return await resp.json();
  } catch (error) {
    console.log('Run yarn movie-api for fake api', error);
  }
};
