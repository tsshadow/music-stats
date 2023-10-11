import React, {useRef, useState} from "react";
import "./LabelChart.css";
import {ArcElement, Chart as ChartJS, Chart, Legend, Tooltip} from "chart.js";
import {Doughnut, getElementAtEvent} from "react-chartjs-2";

interface Props {
    onSelectLabel: (label: string) => void;
}

function LabelChart({onSelectLabel}: Props) {
    const chartRef = useRef();
    const [chartData, setChartData]: any = useState();
    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };


    const onClick = (event: any) => {
        const element = getElementAtEvent(chartRef.current as any as Chart, event)[0];
        if (element) {
            onSelectLabel(chartData.labels[element.index]);
        }
    }

    ChartJS.register(ArcElement, Tooltip, Legend);
    React.useEffect(() => {
        fetch("/labels")
            .then((res) => res.json())
            .then((d) => {
                if (d) {
                    const data: any = {
                        datasets: [{
                            data: d.map((dat: any) => dat.eps),
                            label: '# of eps',
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ]
                        }],
                        labels: d.map((dat: any) => dat.name),
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            }
                        }
                    }
                    if (data) {
                        setChartData(data);
                    }
                }
            }).catch((err) => console.log(err));
    }, []);

    return (
        <div className="LabelChart">
            {chartData?.datasets &&
                <Doughnut
                    ref={chartRef}
                    data={chartData}
                    options={options}
                    onClick={onClick}/>}
        </div>
    );

}

export default LabelChart;
