import {Label} from "./constants";
import React, {useState} from "react";

interface Props {
    label: string
}

function LabelInfo({label}: Props) {

    const [labelInfo, setLabelInfo]: any = useState();
    React.useEffect(() => {
        fetch("/labels?label=" + label)
            .then((res) => res.json())
            .then((d) => {
                if (d) {
                    console.log(d);
                    setLabelInfo(d)
                }
            }).catch((err) => console.log(err));
    }, [label]);
    return (
        <div  className="LabelInfo">
            <div>
                {labelInfo?.name}
            </div>
            <div>
                {labelInfo?.eps}
            </div>
            <div>
                {labelInfo?.mood}
            </div>
        </div>
    );

}

export default LabelInfo;
