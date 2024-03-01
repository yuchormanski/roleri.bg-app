import styles from "./Booking.module.css";

import { useAuthContext } from "../../context/AuthContext.jsx";

import UnregisteredUser from "./UnregisteredUser.jsx";
import RegisteredUser from "./RegisteredUser.jsx";

import { useUser } from "../../hooks/useUser,js";
import { useQueryClient } from "@tanstack/react-query";

function Booking() {
  // TODO: да решим кое е по-добре. Да ползваме Query или да взимаме юзъра от local Sotarage
  //   const queryClient = useQueryClient();
  //   const userData = queryClient.getQueryData(["user"]);
  // const { userData } = useUser();
  const { getUserHandler } = useAuthContext();

  if (!getUserHandler) return <UnregisteredUser />;

  return <RegisteredUser />;
}

export default Booking;
