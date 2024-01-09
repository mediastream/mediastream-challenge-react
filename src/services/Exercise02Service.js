/* eslint-disable import/no-anonymous-default-export */
class Exercise02Service {
  constructor() {
    this.apiHost = 'http://localhost:3001';
  }

  async getMovies({ genre = "", order = "asc" }) {
    const response = await fetch(this.apiHost + `/movies?genres_like=${genre}&_sort=year&_order=${order}`);
    const movies = await response.json();
    return movies;
  }

  async getGenres() {
    const response = await fetch(this.apiHost + `/genres`);
    const genres = await response.json();
    return genres;
  }
}
export default new Exercise02Service();