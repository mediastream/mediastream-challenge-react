import { API_URL } from 'constants/config';

export const fetcher = (url: string) => fetch(`${API_URL}${url}`).then((res) => res.json());
