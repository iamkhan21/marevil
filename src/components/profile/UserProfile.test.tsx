import { render, screen } from "@testing-library/react";
import UserProfile from "./UserProfile";
import { AuthStore } from "../auth/AuthProvider/types";

type mockedHook = () => Pick<AuthStore, "state">;

describe("UserProfile", function () {
  it("should render user data", function () {
    const mockAuthStateHook: mockedHook = () => ({
      state: {
        user: {
          userId: "2",
          username: "Test",
          authToken: "2342-13dfas-adfa",
          paymentsMode: "disabled",
          creationDate: new Date("2020-08-21 15:20"),
        },
        loading: false,
      },
    });

    render(<UserProfile useAuthStateHook={mockAuthStateHook} />);

    expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(screen.getByText(/August 21, 2020, 15:20/i)).toBeInTheDocument();
    expect(screen.getByText(/disabled/i)).toBeInTheDocument();
  });
});
