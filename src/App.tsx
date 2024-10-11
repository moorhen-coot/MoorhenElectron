import { useRef } from 'react';
import { MoorhenContainer, MoorhenReduxStore } from 'moorhen';
import { Provider } from 'react-redux';

import './App.css';
import './moorhen.css';

export const MyMoorhenContainer = (props) => {

    const glRef = useRef(null)
    const commandCentre = useRef(null)
    const moleculesRef = useRef(null)
    const mapsRef = useRef(null)

    const collectedProps = {
        glRef,  commandCentre, moleculesRef, mapsRef
    }

    return (
        <MoorhenContainer {...collectedProps}/>
    )

}

function App() {
  return (
    <div className="App">
      <Provider store={MoorhenReduxStore}>
        <MyMoorhenContainer/>
      </Provider>
    </div>
  );
}

export default App;
