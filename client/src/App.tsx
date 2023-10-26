import React, {useState} from "react";
import LabelChart from "./LabelChart";
import LabelInfo from "./LabelInfo/LabelInfo";
import '../node_modules/bootstrap/dist/css/bootstrap.css';

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
