import React from "react";
import { withAuthorization } from "../components/auth/AuthProvider";
import UserProfile from "../components/profile/UserProfile";
import { useDocTitle } from "../hooks/useDocTitle";

const Profile = () => {
  useDocTitle("Marevil | Profile");
  return (
    <article>
      <h3>Profile</h3>
      <UserProfile />
    </article>
  );
};

export default withAuthorization(Profile);
