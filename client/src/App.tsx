import React, {useState} from "react";
import LabelChart from "./LabelChart";
import LabelInfo from "./LabelInfo";
import {Label} from "./constants";

function App() {

    const [label, setLabel]: any = useState("");

    const handleSelectLabel = (item: string) => {
        setLabel(item);
    }

    return (
        <div className="App">
            <LabelChart onSelectLabel={handleSelectLabel}/>
            <LabelInfo
                label={label}
            />
        </div>
    );
}

export default App;
