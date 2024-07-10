import { useRef } from 'react';

import './App.css';
import './moorhen.css';
import { MoorhenContainer, MoorhenReduxStore } from 'moorhen';
import { Provider } from 'react-redux';

function App() {
  const glRef = useRef(null)
  const commandCentre = useRef(null)
  const collectedProps = {
        glRef,  commandCentre
    }
  return (
    <div className="App">
      <Provider store={MoorhenReduxStore}> 
        <MoorhenContainer  {...collectedProps}/>
      </Provider>
    </div>
  );
}

export default App;
