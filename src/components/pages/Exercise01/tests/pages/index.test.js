import { render, screen } from "@testing-library/react";
import Exercise01 from "../../../Exercise01";

beforeEach(() => {
  render(<Exercise01 />);
});

describe("Exercise01", () => {
  describe("When it renders", () => {
    it("shows the movie items", () => {
      const movieItems = screen.getAllByTestId("movie-item");
      expect(movieItems).toHaveLength(4);
    });

    it("shows the default item in the cart", () => {
      const movieItems = screen.getAllByTestId("cart-item");
      expect(movieItems).toHaveLength(1);
    });

    it("shows the right total value", () => {
      const total = screen.getByTestId("total");
      expect(total).toHaveTextContent("Total: $40");
    });
  });

  describe("When the user delete an item of the cart", () => {
    beforeEach(() => {
      const decrementButton = screen.getByTestId("decrement-button");
      decrementButton.click();
      decrementButton.click();
    });

    it("shows the movie items", () => {
      const movieItems = screen.queryAllByTestId("cart-item");
      expect(movieItems).toHaveLength(0);
    });
  });

  describe("When the user add a new element to a cart", () => {
    beforeEach(() => {
      const addToCartMovie2 = screen.getByTestId("add-to-cart-2");
      addToCartMovie2.click();
    });

    it("updates the cart", () => {
      const movieItems = screen.queryAllByTestId("cart-item");
      expect(movieItems).toHaveLength(2);
    });
  });
});
