export interface Item {
  id: number;
  title: string;
  year: string;
  runtime: string;
  genres: Genres;
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
}

export interface Genres {
  [x: string]: any;
  [index: number]: string;
}
