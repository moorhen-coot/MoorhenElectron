import { useRef, useState, useReducer } from 'react';
import { useEffect } from 'react';
import { MoorhenContainer, MoorhenMolecule, MoorhenMap, MoorhenMoleculeSelect, addMolecule, MoorhenDraggableModalBase, addMap, setActiveMap, MoorhenReduxStore } from 'moorhen';
import { InputGroup, Modal, NavDropdown } from 'react-bootstrap';
import { Avatar, Button, Link, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { Provider } from 'react-redux';

import './App.css';
import './moorhen.css';

export const MyMoorhenContainer = (props) => {

  const glRef = useRef(null)
  const [appTitle, setAppTitle] = useState('MoorhenElectron')

  const commandCentre = useRef(null)

  const moleculesRef = useRef(null)
  const mapsRef = useRef(null)

  const dispatch = useDispatch()

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
