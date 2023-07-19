import { useRef, useState, useReducer } from 'react';
import { useEffect } from 'react';
import { MoorhenContainer, MoorhenMolecule, MoorhenMap, MoorhenMoleculeSelect, itemReducer } from 'moorhen';

function useInterval(callback,delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if(delay !== null) {
            let id = setInterval(tick,delay);
            return () => {
                clearInterval(id);
            }
        }
    }, [delay]);
}

const initialMoleculesState = []

const initialMapsState = []

export const MoorhenRemoteControl = (props) => {

    const [molecules, changeMolecules] = useReducer(itemReducer, initialMoleculesState)
    const [maps, changeMaps] = useReducer(itemReducer, initialMapsState)
    const [cootInitialized, setCootInitialized] = useState(false)

    const selectorRef = useRef(null)

    const moleculesRef = useRef(null)
    const mapsRef = useRef(null)

    moleculesRef.current = molecules;
    mapsRef.current = maps;

    const collectedProps = {
        molecules, changeMolecules, maps, changeMaps, moleculesRef, mapsRef
    }

    const controls = useRef(null);

    useInterval(async() => {
        console.log("Poll");
        const url = window.location.origin+"/getCommandStack";
        const response = await fetch(url);
        const json = await response.text();
        try {
            const obj = JSON.parse(json);
            obj.forEach(com => {
                if("load" in com){
                    const url = com["load"];
                    const name = com["name"];
                    console.log("Load",url,name);
                    fetchMoleculeFromURL(url,name);
                }
            });
        } catch (e) {
        }

    }, 1000.)

    const fetchMoleculeFromURL = async (url, molName) => {
        const newMolecule = new MoorhenMolecule(controls.current.commandCentre, controls.current.glRef)
        console.log(newMolecule);
        try {
            await newMolecule.loadToCootFromURL(url, molName)
            if (newMolecule.molNo === -1) throw new Error("Cannot read the fetched molecule...")
            await newMolecule.fetchIfDirtyAndDraw('CBs')
            changeMolecules({ action: "Add", item: newMolecule })
            newMolecule.centreOn('/*/*/*/*', false)
            return newMolecule
        } catch (err) {
            console.log(`Cannot fetch molecule from ${url}`)
        }   
    }

    return <>
        <MoorhenContainer
            {...collectedProps}
            forwardControls={(returnedControls) => {
                controls.current = returnedControls
                setCootInitialized(true)
            }}
            lookup={props.lookup}
            urlPrefix={""}
        />
    </>
}
