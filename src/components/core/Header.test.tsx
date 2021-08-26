import Header from "./Header";
import { AuthStore } from "../auth/AuthProvider/types";
import renderWithRouter from "../../../__tests__/testUtils/renderWithRouter";
import { screen } from "@testing-library/react";

type mockedHook = () => Pick<AuthStore, "state" | "signOut">;

describe("Header", function () {
  it("should mark active link", function () {
    const mockAuthStateHook: mockedHook = () => ({
      state: { user: null, loading: false },
      signOut: jest.fn(),
    });

    renderWithRouter(<Header useAuthStateHook={mockAuthStateHook} />, "/login");

    const el = screen.getByText(/login/i);
    expect(el).toHaveClass("nav-link__active");
  });
  it("shouldn't have links in loading state", function () {
    const mockAuthStateHook: mockedHook = () => ({
      state: { user: null, loading: true },
      signOut: jest.fn(),
    });

    const { container } = renderWithRouter(
      <Header useAuthStateHook={mockAuthStateHook} />
    );

    expect(container.textContent).not.toMatch("Home");
    expect(container.textContent).not.toMatch("Login");
    expect(container.textContent).not.toMatch("Profile");
    expect(container.textContent).not.toMatch("Signup");
  });
  it("should render for unauthenticated user", function () {
    const mockAuthStateHook: mockedHook = () => ({
      state: { user: null, loading: false },
      signOut: jest.fn(),
    });

    const { container } = renderWithRouter(
      <Header useAuthStateHook={mockAuthStateHook} />
    );

    expect(container.textContent).toMatch("Home");
    expect(container.textContent).toMatch("Login");
    expect(container.textContent).toMatch("Signup");
  });
  it("should render for authenticated user", function () {
    const mockAuthStateHook: mockedHook = () => ({
      state: {
        user: {
          userId: "2",
          username: "Test",
          authToken: "2342-13dfas-adfa",
        },
        loading: false,
      },
      signOut: jest.fn(),
    });

    const { container } = renderWithRouter(
      <Header useAuthStateHook={mockAuthStateHook} />
    );
    expect(container.textContent).toMatch("Home");
    expect(container.textContent).toMatch("Profile");
    expect(container.textContent).toMatch("Sign out");
  });
});
