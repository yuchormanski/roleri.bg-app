import { useState } from "react";

export function useToggleModal() {
  const [isShownModal, setIsShownModal] = useState(false);
  const toggleModal = () => setIsShownModal(!isShownModal);

  return [isShownModal, toggleModal];
}
