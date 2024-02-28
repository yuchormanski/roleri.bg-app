import { useQueryClient } from "@tanstack/react-query";
import styles from "./Booking.module.css";
import UnregisteredUser from "./UnregisteredUser.jsx";
import RegisteredUser from "./RegisteredUser.jsx";
import { useUser } from "../../hooks/useUser,js";

function Booking() {
  // TODO: да решим кое е по-добре. Да ползваме Query или да взимаме юзъра от local Sotarage
  //   const queryClient = useQueryClient();
  //   const userData = queryClient.getQueryData(["user"]);
  const { userData } = useUser();

  if (!userData) return <UnregisteredUser />;

  return <RegisteredUser />;
}

export default Booking;
