import { useAuthContext } from "../../context/AuthContext.jsx";

import UnregisteredUser from "./UnregisteredUser.jsx";
import RegisteredUser from "./RegisteredUser.jsx";

function Booking() {
  const { getUserHandler } = useAuthContext();

  if (!getUserHandler()) return <UnregisteredUser />;

  return <RegisteredUser />;
}

export default Booking;
