import { useRef, useState, MouseEventHandler } from 'react';
import { useDispatch, Provider } from 'react-redux'
import { Form, Button, InputGroup } from "react-bootstrap";
import { MoorhenContainer, MoorhenMolecule, MoorhenMap, addMolecule, addMap, setActiveMap, MoorhenReduxStore } from 'moorhen';

import './App.css';
import './moorhen.css';

export const MyMoorhenContainer = (props) => {

    const glRef = useRef(null)
    const [appTitle, setAppTitle] = useState('MoorhenElectron')

    const pathRef = useRef<HTMLInputElement>()

    const commandCentre = useRef(null)

    const moleculesRef = useRef(null)
    const mapsRef = useRef(null)

    const dispatch = useDispatch()

    const collectedProps = {
        glRef,  commandCentre, moleculesRef, mapsRef
    }

    const readMtzFile = async (fileContents: any, isDiff: boolean): Promise<MoorhenMap> => {
        const newMap = new MoorhenMap(commandCentre, glRef)
        console.log("Attempting to read data named",fileContents.name)
        const chunkSize = 65536
        let selectedMtzColumns
        if(isDiff)
            selectedMtzColumns = { F: "DELFWT", PHI: "PHDELWT", isDifference: true, useWeight: false }
        else
            selectedMtzColumns = { F: "FWT", PHI: "PHWT", isDifference: false, useWeight: false, calcStructFact: true }
        newMap.loadToCootFromMtzData(fileContents.data.data, fileContents.name, selectedMtzColumns)
          .then(async reply => {
              dispatch(addMap(reply))
              dispatch(setActiveMap(reply))
              return newMap
        })
        return newMap
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
      let readMapPromises: Promise<MoorhenMap>[] = []

      responseArray.forEach(file => {
          if(file.name.endsWith(".pdb")){
            readPromises.push(readPdbFile(file))
          }
          if(file.name.endsWith(".mtz")){
            readMapPromises.push(readMtzFile(file,true))
            readMapPromises.push(readMtzFile(file,false))
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

      let newMaps: MoorhenMap[] = await Promise.all(readMapPromises)
      console.log(newMaps.length,"maps")
      if (!newMaps.every(map => map.molNo !== -1)) {
          console.log("Failed to read map")
          newMaps = newMaps.filter(map => map.molNo !== -1)
          if (newMaps.length === 0) {
              return
          }
          console.log("Loaded?",newMaps)
          newMaps.forEach(map => {
              Promise.resolve(map.molNo)
          })
      }
    }

    const loadFilesOnServer = async () => {
        console.log(pathRef.current.value)
        loadDir(pathRef.current.value)
    }

    const exportMenuItem = <Form.Group className='moorhen-form-group' controlId="CustomLoadAllInServerDirectory">
                           <Form.Label>Load all in server directory:</Form.Label>
                           <InputGroup>
                           <Form.Control ref={pathRef} type="text" />
                           <Button variant="secondary"  onClick={loadFilesOnServer}>Load</Button>
                           </InputGroup>
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
