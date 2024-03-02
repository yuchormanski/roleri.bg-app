import { Toaster } from "react-hot-toast";
import { useTheme } from "../../../context/DarkMode.jsx";

function ToasterComponent() {
  const { isDark } = useTheme();

  const toastStyle = isDark
    ? {
        color: "#dfe2e9",
        backgroundColor: "var(--color-header)",
      }
    : {
        backgroundColor: "#fff",
      };

  return (
    <Toaster
      position={"top-center"}
      gutter={12}
      containerStyle={{ margin: "0.8rem" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 3000,
        },
        style: {
          ...toastStyle,
          fontSize: "1.6rem",
          maxWidth: "50rem",
          padding: "1.6rem 2.4rem",
        },
      }}
    />
  );
}

export default ToasterComponent;
