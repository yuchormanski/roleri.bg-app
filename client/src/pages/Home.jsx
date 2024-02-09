import toast from "react-hot-toast";

function Home() {
  function test() {
    toast.success("Success");
  }
  function test2() {
    toast.error("Not Success");
  }
  function test3() {
    toast.loading(
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
    <>
      <h1>Home</h1>;<button onClick={test}>Button</button>
      <button onClick={test2}>Button</button>
      <button onClick={test3}>Button</button>
    </>
  );
}

export default Home;
