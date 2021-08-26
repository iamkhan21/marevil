import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", function () {
  it("should render", function () {
    render(
      <Button type={"button"} className={"test"}>
        Test
      </Button>
    );

    const btn = screen.getByText(/Test/i);

    expect(btn).toHaveClass("btn");
    expect(btn).toHaveClass("test");
    expect(btn).toHaveAttribute("type", "button");
  });
  it("should have primary appearance", function () {
    render(<Button appearance={"primary"}>Test</Button>);

    expect(screen.getByText(/Test/i)).toHaveClass("btn__primary");
  });
  it("should have success appearance", function () {
    render(<Button appearance={"success"}>Test</Button>);

    expect(screen.getByText(/Test/i)).toHaveClass("btn__success");
  });
});
