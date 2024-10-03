import { useRef, useState, useReducer } from 'react';
import { useEffect } from 'react';
import { MoorhenContainer, MoorhenMolecule, MoorhenMap, MoorhenMoleculeSelect, addMolecule, MoorhenDraggableModalBase, addMap, setActiveMap, MoorhenReduxStore } from 'moorhen';
import { InputGroup, Modal, NavDropdown } from 'react-bootstrap';
import { Avatar, Button, Link, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { Provider } from 'react-redux';
import { Form } from "react-bootstrap";

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

    const readPdbFile = async (fileContents: any): Promise<MoorhenMolecule> => {
        const newMolecule = new MoorhenMolecule(commandCentre, glRef)

        const defaultBondSmoothness =  MoorhenReduxStore.getState().sceneSettings.defaultBondSmoothness
        const backgroundColor = MoorhenReduxStore.getState().sceneSettings.backgroundColor
        newMolecule.setBackgroundColour(backgroundColor)
        newMolecule.defaultBondOptions.smoothness = defaultBondSmoothness

        console.log("Attempting to read data named",fileContents.name)
        const chunkSize = 65536
        let pdbStr : string = ""
        for (let i = 0; i < fileContents.data.data.length; i += chunkSize) {
            const chunk = fileContents.data.data.slice(i, i + chunkSize)
            pdbStr += String.fromCharCode.apply(null, chunk)
        }
        newMolecule.loadToCootFromString(pdbStr,fileContents.name)
          .then(async reply => {
              dispatch(addMolecule(reply))
              newMolecule.centreOn()
              await reply.fetchIfDirtyAndDraw('CBs')
              return newMolecule
        })
        return newMolecule
    }

    const loadDir = async(dirname) => {
      const response = await fetch(`http://localhost:32778/load_all_from_dir/`+dirname)
      const responseText = await response.text()
      const responseArray : any[] = JSON.parse(responseText)
      let readPromises: Promise<MoorhenMolecule>[] = []

      responseArray.forEach(file => {
          if(file.name.endsWith(".pdb")){
            readPromises.push(readPdbFile(file))
          }
      })

      let newMolecules: MoorhenMolecule[] = await Promise.all(readPromises)
      console.log(newMolecules.length,"molecules")
      if (!newMolecules.every(molecule => molecule.molNo !== -1)) {
          console.log("Failed to read molecule")
          newMolecules = newMolecules.filter(molecule => molecule.molNo !== -1)
          if (newMolecules.length === 0) {
              return
          }
          console.log("Loaded?",newMolecules)
          newMolecules.forEach(molecule => {
              Promise.resolve(molecule.molNo)
          })
      }
    }

    const loadPdbFiles = async (files: FileList) => {
        console.log("Hello")
        let pathList = []
        Array.prototype.forEach.call(files, file => {
            console.log(file.path)
            pathList.push(file.path.split("/").slice(0,-1).join("/"))
        })
        const unique = pathList.filter((value, index, array) => array.indexOf(value) === index);
        console.log(unique)
        unique.forEach(dirname => {
            loadDir(dirname)
        })
    }

    const exportMenuItem = <Form.Group className='moorhen-form-group' controlId="upload-coordinates-form">
                           <Form.Label>Load all..</Form.Label>
                           <Form.Control type="file"  multiple={true} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { loadPdbFiles(e.target.files) }}/>
                           </Form.Group>

    return <MoorhenContainer  extraFileMenuItems={[exportMenuItem]} {...collectedProps}/>

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
