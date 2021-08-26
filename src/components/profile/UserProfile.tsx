import React from "react";
import { useAuthState } from "../auth/AuthProvider";
import { formatDateToHR } from "../../utils/formatters";
import { AuthStore } from "../auth/AuthProvider/types";

interface Props {
  useAuthStateHook?: () => Pick<AuthStore, "state">;
}

const UserProfile: React.FC<Props> = ({ useAuthStateHook = useAuthState }) => {
  const {
    state: { user },
  } = useAuthStateHook();

  return (
    <section>
      <div>
        <span>Username: </span>
        <b>{user?.username}</b>
      </div>
      <div>
        <span>Created at: </span>
        <b>{user?.creationDate && formatDateToHR(user.creationDate)}</b>
      </div>
      <div>
        <span>Payments: </span>
        <b>{user?.paymentsMode}</b>
      </div>
    </section>
  );
};

export default UserProfile;
