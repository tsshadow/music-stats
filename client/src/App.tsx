import React from "react";
import LabelChart from "./LabelChart";
import LabelInfo from "./LabelInfo";
import {Label} from "./constants";

function App() {

    const label: Label = {
        eps: 10, genres: "genre", mood: "mood", name: "name"
    }
    return (
        <div className="App">
            <LabelChart />
            <LabelInfo
                name={label.name}
                eps={label.eps}
                genres={label.genres}
                mood={label.mood}
            />
        </div>
    );
}

export default App;
