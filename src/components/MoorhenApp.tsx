import { useEffect } from "react";
import { MoorhenProvider } from "moorhen";
import { MoorhenContainer } from "moorhen";

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

