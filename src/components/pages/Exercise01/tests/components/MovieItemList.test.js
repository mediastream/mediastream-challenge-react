import { render, screen } from "@testing-library/react";
import { MovieItemList } from "../../components/MovieItemList";

const addToCartMock = jest.fn();

const movie = {
  id: 1,
  name: "Star Wars",
  price: 20,
};

beforeEach(() => {
  render(<MovieItemList movie={movie} addToCartMock={addToCartMock} />);
});

describe("MovieItemList", () => {
  describe("When it renders", () => {
    it("shows right data", () => {
      const id = screen.getByTestId("movie-id");
      const name = screen.getByTestId("movie-name");
      const price = screen.getByTestId("movie-price");

      expect(id).toHaveTextContent("ID: 1");
      expect(name).toHaveTextContent("Name: Star Wars");
      expect(price).toHaveTextContent("Price: $20");
    });
  });
});
