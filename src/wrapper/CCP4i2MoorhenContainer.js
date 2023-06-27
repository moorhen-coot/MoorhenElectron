import { useCallback, useRef, useState, useContext, useReducer } from 'react';
import { useEffect } from 'react';
import { MoorhenContainer, MoorhenMolecule, MoorhenMap, MoorhenMoleculeSelect, MoorhenHistoryMenu } from 'moorhen';
import { Modal, NavDropdown, Table } from 'react-bootstrap';
import { Button, MenuItem, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import $ from 'jquery';
import { ArrowBack } from '@mui/icons-material';


const initialMoleculesState = []

const initialMapsState = []

const itemReducer = (oldList, change) => {
    if (change.action === 'Add') {
        return [...oldList, change.item]
    }
    else if (change.action === 'Remove') {
        return oldList.filter(item => item.molNo !== change.item.molNo)
    }
    else if (change.action === 'AddList') {
        return oldList.concat(change.items)
    }
    else if (change.action === 'Empty') {
        return []
    }
}

export const CCP4i2MoorhenContainer = (props) => {
        const glRef = useRef(null)
        const moleculesRef = useRef(null)
        const mapsRef = useRef(null)
        const activeMapRef = useRef(null)
        const timeCapsuleRef = useRef(null)
        const commandCentre = useRef(null)
        const consoleDivRef = useRef(null)
        const lastHoveredAtom = useRef(null)
        const prevActiveMoleculeRef = useRef(null)
        const [activeMap, setActiveMap] = useState(null)
        const [activeMolecule, setActiveMolecule] = useState(null)
        const [hoveredAtom, setHoveredAtom] = useState({ molecule: null, cid: null })
        const [consoleMessage, setConsoleMessage] = useState("")
        const [cursorStyle, setCursorStyle] = useState("default")
        const [busy, setBusy] = useState(false)
        const [windowWidth, setWindowWidth] = useState(window.innerWidth)
        const [windowHeight, setWindowHeight] = useState(window.innerHeight)
        //const [commandHistory, dispatchHistoryReducer] = useReducer(MoorhenHistoryMenu.historyReducer, MoorhenHistoryMenu.initialHistoryState)
        const [backgroundColor, setBackgroundColor] = useState([1, 1, 1, 1])
        const [appTitle, setAppTitle] = useState('Moorhen')
        const [theme, setTheme] = useState("flatly")
        const [showToast, setShowToast] = useState(false)
        const [toastContent, setToastContent] = useState("")
        const [showColourRulesToast, setShowColourRulesToast] = useState(false)
    const [molecules, changeMolecules] = useReducer(itemReducer, initialMoleculesState)
    const [maps, changeMaps] = useReducer(itemReducer, initialMapsState)
    const [currentDropdownId, setCurrentDropdownId] = useState(-1)
    const [cootInitialized, setCootInitialized] = useState(false)
    const collectedProps = {
            glRef, timeCapsuleRef, commandCentre, moleculesRef, mapsRef, activeMapRef,
            consoleDivRef, lastHoveredAtom, prevActiveMoleculeRef, activeMap,
            setActiveMap, activeMolecule, setActiveMolecule, hoveredAtom, setHoveredAtom,
            consoleMessage, setConsoleMessage, cursorStyle, setCursorStyle, busy, setBusy,
            windowWidth, setWindowWidth, windowHeight, setWindowHeight,  molecules, changeMolecules, maps, changeMaps,
            backgroundColor, setBackgroundColor, currentDropdownId, setCurrentDropdownId,
            appTitle, setAppTitle, cootInitialized, setCootInitialized, theme, setTheme,
            showToast, setShowToast, toastContent, setToastContent, showColourRulesToast,
            setShowColourRulesToast, forwardControls: props.forwardControls
        }
    return <MoorhenContainer {...collectedProps} />
}

CCP4i2MoorhenContainer.defaultProps = {
    forwardControls: function (controls) { console.log('Fetched controls', { controls: controls }); }
};

