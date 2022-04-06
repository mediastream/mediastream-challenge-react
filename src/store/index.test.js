import { renderHook } from "@testing-library/react-hooks";
import { useStore } from "./index";

test("should use store", () => {
  const { result } = renderHook(() => useStore());

  expect(result.current.cart).toStrictEqual([]);
  expect(typeof result.current.addToCart).toBe("function");

  result.current.addToCart({
    id: 2,
    name: "Minions",
    price: 25,
  });

  expect(result.current.cart).toStrictEqual([
    {
      id: 2,
      name: "Minions",
      price: 25,
      quantity: 1,
    },
  ]);
});
