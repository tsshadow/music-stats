import React, {useState} from "react";
import "./LabelChart.css";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";

function LabelChart() {
    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };


    const [chartData, setChartData] = useState();
    ChartJS.register(ArcElement, Tooltip, Legend);
    React.useEffect(() => {
        fetch("/labels")
            .then((res) => res.json())
            .then((d) => {
                if (d) {
                    const data = {
                        datasets: [{
                            data: d.map(dat => dat.eps),
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
                        labels: d.map(dat => dat.name),
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
        <div className="App">
            {chartData?.datasets &&  <Doughnut data={chartData} options={options}/>}
        </div>
    );

}

export default LabelChart;
