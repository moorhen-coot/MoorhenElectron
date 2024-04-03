import { useRef } from 'react';

import './App.css';
import './moorhen.css';
import { MoorhenContainer } from 'moorhen';
import { MoorhenReduxProvider } from "moorhen";

function App() {
  const glRef = useRef(null)
  const commandCentre = useRef(null)
  const collectedProps = {
        glRef,  commandCentre
    }
  return (
    <div className="App">
      <MoorhenReduxProvider>
        <MoorhenContainer  {...collectedProps}/>
      </MoorhenReduxProvider>
    </div>
  );
}

export default App;
