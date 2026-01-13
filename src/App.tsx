import { useRef } from "react";
import { MoorhenContainer, MoorhenProvider } from "moorhen";

export const MyMoorhenContainer = (props) => {
    const glRef = useRef(null);
    const commandCentre = useRef(null);
    const moleculesRef = useRef(null);
    const mapsRef = useRef(null);

    const collectedProps = {
        glRef,
        commandCentre,
        moleculesRef,
        mapsRef,
    };

    return <MoorhenContainer {...collectedProps} />;
};

function App() {
    return (
        <div>
            <MoorhenProvider>
                <MoorhenContainer />
            </MoorhenProvider>
        </div>
    );
}

export default App;
