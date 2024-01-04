import './App.css';
import './moorhen.css';
import { MoorhenContainer } from 'moorhen';
import { MoorhenReduxProvider } from "moorhen";

function App() {
  return (
    <div className="App">
      <MoorhenReduxProvider>
        <MoorhenContainer/>
      </MoorhenReduxProvider>
    </div>
  );
}

export default App;
