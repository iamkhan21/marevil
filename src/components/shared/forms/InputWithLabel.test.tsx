import { render, screen } from "@testing-library/react";
import InputWithLabel from "./InputWithLabel";

describe("InputWithLabel", function () {
  it("should render", function () {
    render(<InputWithLabel label={"Label"} className={"test"} />);

    const el = screen.getByTestId("input-with-label");

    expect(el.textContent).toMatch("Label:");
    expect(el).toHaveClass("test");
  });
});
