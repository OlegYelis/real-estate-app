import { Link } from "react-router-dom";
import "./App.css";
import { Button } from "./components/Button/Button";

function App() {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Button>Click me</Button>
    </>
  );
}

export default App;
