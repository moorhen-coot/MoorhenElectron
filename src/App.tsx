import './App.css';
import './moorhen.css';
import { MoorhenContainer } from 'moorhen';
import { MoorhenContextProvider } from "moorhen";

function App() {
  return (
    <div className="App">
      <MoorhenContextProvider>
        <MoorhenContainer/>
      </MoorhenContextProvider>
    </div>
  );
}

export default App;
