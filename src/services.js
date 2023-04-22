const baseUrl = 'http://localhost:3001';
const movieUrl = `${baseUrl}/movies`;
const genreUrl = `${baseUrl}/genres`;

/**
 *
 * @param {*} queryParams
 * @returns movies[] or []
 */
export const getMovies = async (queryParams = '') => {
  try {
    return await (await fetch(`${movieUrl}?${queryParams}`)).json();
  } catch (error) {
    console.error('Run yarn movie-api for fake api');

    return [];
  }
};

/**
 *
 * @param {*} queryParams
 * @returns genres[] or []
 */
export const getGenres = async (queryParams = '') => {
  try {
    return await (await fetch(`${genreUrl}?${queryParams}`)).json();
  } catch (error) {
    console.error('Run yarn movie-api for fake api');

    return [];
  }
};

/**
 *
 * @param {*} param0
 * @returns [movies[], genres[]] or [[], []]
 */
export const exercise02Loader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    url.searchParams.set('_limit', '1000');

    const initialMovies = await getMovies(url.searchParams);
    const initialGenres = await getGenres();

    return [initialMovies, initialGenres];
  } catch {
    console.error('Run yarn movie-api for fake api');

    return [[], []];
  }
};
