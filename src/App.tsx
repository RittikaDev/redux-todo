// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "./redux/features/counterSlice";
// import { Button } from "./components/ui/button";
import { Outlet } from "react-router-dom";
import NavBar from "./components/layout/NavBar";

function App() {
  // const dispatch = useDispatch();
  // const { count } = useSelector(
  // 	(state: { counter: { count: number } }) => state.counter
  // );

  // const handleIncrement = () => {
  // 	dispatch(increment());
  // };
  // const handleDecrement = () => {
  // 	dispatch(decrement());
  // };
  return (
    <div>
      {/* <h1>Counter: {count}</h1>
			<Button onClick={handleIncrement}>Increment</Button>
			<Button onClick={handleDecrement}>Decrement</Button> */}

      <NavBar />
      {/* WILL RENDER THE CHILDREN ROUTES */}
      <Outlet />
    </div>
  );
}

export default App;
