import toast from "react-hot-toast";
import Button from "../ui/elements/Button.jsx";
import Row from "../ui/elements/Row.jsx";

function Home() {
  function test() {
    toast.success("Success");
  }
  function test2() {
    toast.error("Not Success");
  }
  function test3() {
    toast.promise(
      "LOADING ...",
      { duration: 2000 },
      {
        style: {
          display: "grid",
          placeItems: "center",
        },
      }
    );
  }
  return (
    <Row justify="start" align="bottom" gap={3}>
      <h1>Home</h1>
      <button onClick={test}>Button</button>
      <button onClick={test2}>Button</button>
      <button onClick={test3}>Button</button>
      <Button to={"/"}>Test button</Button>
    </Row>
  );
}

export default Home;
