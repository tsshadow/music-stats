import Card from 'react-bootstrap/Card';
import React, {useState} from "react";
import Pill from "./Pill/Pill";

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
        <Card>
            <Card.Title>
                {labelInfo?.name}
            </Card.Title>
            <Card.Body>
                {labelInfo?.eps ? `Eps:${labelInfo.eps}` : ''}
            </Card.Body>
            <Card.Body>
                {labelInfo?.songs ? `Songs:${labelInfo.songs}` : ''}
            </Card.Body>
            <div style={{display: 'inline'}}>
                {labelInfo?.mood?.map((moodItem: any) => (
                        <Pill mood={moodItem.mood}  count={moodItem.count}/>
                    )
                )}</div>
        </Card>
    );

}

export default LabelInfo;
