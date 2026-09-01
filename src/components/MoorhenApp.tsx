import { useEffect } from "react";
import { MoorhenProvider } from "moorhen/react-lib";
import { MoorhenContainer } from "moorhen/react-lib";

export const MoorhenExitMenu = (props: { exitCallback: () => void }) => {
    useEffect(() => {
        props.exitCallback();
    }, []);

    return <span>Saving...</span>;
};

export const MoorhenApp = () => {
    return (
        <MoorhenProvider>
            <MoorhenContainer />
        </MoorhenProvider>
    );
};

