import React from "react";
import { withAuthorization } from "../components/auth/AuthProvider";

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default withAuthorization(Dashboard);
