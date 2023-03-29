import { render, screen } from "@testing-library/react";
import { MovieItemList } from "../../components/MovieItemList";

const movie = {
  id: 1,
  title: "Beetlejuice",
  year: "1988",
  runtime: "92",
  genres: ["Comedy", "Fantasy"],
  director: "Tim Burton",
  actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
  plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
  posterUrl:
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg",
};

beforeEach(() => {
  render(<MovieItemList movie={movie} />);
});

describe("MovieItemList", () => {
  describe("When it renders", () => {
    it("shows right data", () => {
      const title = screen.getByTestId("movie-title");
      const name = screen.getByTestId("movie-genres");
      const year = screen.getByTestId("movie-year");

      expect(title).toHaveTextContent("Beetlejuice");
      expect(name).toHaveTextContent("Comedy, Fantasy");
      expect(year).toHaveTextContent("1988");
    });
  });
});
