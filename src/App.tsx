import './App.css';
import { MoorhenApp } from 'moorhen';
import { MoorhenContextProvider } from "moorhen";

function App() {
  return (
    <div className="App">
      <MoorhenContextProvider>
        <MoorhenApp/>
      </MoorhenContextProvider>
    </div>
  );
}

export default App;
