import Button from "./components/ui/Button";
import { FaBeer } from "react-icons/fa";
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Button text="Click me" spinnerCssClass="" onClick={(e) => { console.log(e) }} />
    </div>
  );
}

export default App;
