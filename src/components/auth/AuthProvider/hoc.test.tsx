import { withAuthorization } from "./hoc";
import React from "react";
import { AuthContextProps } from "./context";
import { render } from "@testing-library/react";
import renderWithRouter from "../../../../__tests__/testUtils/renderWithRouter";

const TestComponent: React.FC<any> = () => <div>Test Page</div>;

describe("AuthProvider HOCs", function () {
  describe("withAuthorization", function () {
    it("should show loading message", function () {
      const mockContextHook = (): AuthContextProps => ({
        state: { user: null, loading: true },
        dispatch: jest.fn,
      });

      const Component = withAuthorization(TestComponent, true, mockContextHook);

      const { container } = render(<Component />);

      expect(container.textContent).toMatch("Checking authorization...");
    });
    it("should show unauthorized message", function () {
      const mockContextHook = (): AuthContextProps => ({
        state: { user: null, loading: false },
        dispatch: jest.fn,
      });

      const Component = withAuthorization(TestComponent, true, mockContextHook);

      const { container } = renderWithRouter(<Component />);

      expect(container.textContent).toMatch("Sorry, we can't recognise you.");
    });
    it("should show already authenticated message", function () {
      const mockContextHook = (): AuthContextProps => ({
        state: {
          user: {
            userId: "2",
            username: "Test",
            authToken: "2342-13dfas-adfa",
          },
          loading: false,
        },
        dispatch: jest.fn,
      });

      const Component = withAuthorization(
        TestComponent,
        false,
        mockContextHook
      );

      const { container } = renderWithRouter(<Component />);

      expect(container.textContent).toMatch("You're already authenticated.");
    });
    it("should show child component", function () {
      const mockContextHook = (): AuthContextProps => ({
        state: {
          user: {
            userId: "2",
            username: "Test",
            authToken: "2342-13dfas-adfa",
          },
          loading: false,
        },
        dispatch: jest.fn,
      });

      const Component = withAuthorization(TestComponent, true, mockContextHook);

      const { container } = render(<Component />);

      expect(container.textContent).toMatch("Test Page");
    });
  });
});
