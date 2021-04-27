import { ResponsiveLine } from '@nivo/line';
import { entries } from 'idb-keyval';
import React, {useEffect, useState, useRef} from 'react';
import {getAllEntries, voltageProfileStore} from '../../../store/broweserIndexActions.js';


const ChartData = (props) => {

    let initialRender = useRef(true);
    const [inputValues, setInputValues] = useState({});
    const [retrieveState, setRetrieveState] = useState(false);
    const [data, setData] = useState([{"data": []}]);
    const dummyData = [{
        "data": [{x: 0, y: 0}, {x: 1000, y: 10}]
    }]


    useEffect(() => {
        if (initialRender){
            entries(voltageProfileStore)
            .then(values =>{
                if (values.length > 0){
                    const chosenArr = values.find((i) => i[0] === props.chosenIdentifier);
                    const storeData = chosenArr[1].voltageProfileStore;
                    setRetrieveState(true);
                    setInputValues(storeData);
                }
            });
            initialRender = false;
        }
    }, []);

    useEffect(() => {
        if (retrieveState){      
          const newData = [];
          let iter = 0;
          for (let index in inputValues){
            const newArr = Object.values(inputValues[index]);
            newData.push({"id": index, "data": []});
            for (let i of newArr){
              if(i.distance && i.voltage){
                newData[iter].data.push({"x": parseFloat(i.distance), "y": parseFloat(i.voltage)});
              }
            }
            iter++;
          }
          setData(newData);
          setRetrieveState(false);
        }
      }, [inputValues]);

    const getMaxChartValue = preppedData => {
        if (data[0].data.length > 1){
            const maxArray = preppedData.map(data => data.data.reduce((max, p) => (p.y > max ? p.y : max), data.data[0].y));
            return Math.max(...maxArray);
        }
    };
    const MaxValue = getMaxChartValue(data);
    const getMinChartValue = preppedData => {
        if (data[0].data.length > 1){
            const maxArray = preppedData.map(data => data.data.reduce((min, p) => (p.y < min ? p.y : min), data.data[0].y));
            return Math.min(...maxArray);
        }
    };
    const MinValue = getMinChartValue(data);
    
    const tickValuesY = () => {
        const newArr = [];
        if (data[0].data.length > 1){
            if (MaxValue <= 15){
                return Array.from({length: Math.ceil(MaxValue)}, (_, i) => i + Math.floor(MinValue));
            } else if (MaxValue <= 50){
                return [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
            } else if (MaxValue <= 100){
                return [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
            } else {
                return [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
            }
        } else {
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        }
    }

    return (
        <>
        <ResponsiveLine
            data={data[0].data.length > 1 ? data : dummyData}
            margin={{ top: 30, right: 100, bottom: 50, left: 50 }}
            xScale={{ type: 'linear' }}
            yScale={{ type: 'linear', min: data[0].data.length > 1 ? Math.floor(getMinChartValue(data)) : 0, max: data[0].data.length > 1 ? Math.ceil(getMaxChartValue(data)): 10}}
            curve="monotoneX"
            axisTop={null}
            axisBottom={{
                tickValues: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                format: '.2f',
                legend: 'Distance',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickValues: tickValuesY(), //,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Voltage',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            enableGridX={true}
            colors={{ "scheme": "set1" }}
            lineWidth={data[0].data.length > 1 ? 2 : 0}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={data[0].data.length > 1 ? 2 : 0}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={data[0].data.length > 1 ? true : false}
            legends={[
              {
                  anchor: 'right',
                  direction: 'column',
                  justify: false,
                  translateX: 90,
                  translateY: 0,
                  itemsSpacing: 7,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 12,
                  itemOpacity: 0.75,
                  symbolSize: data[0].data.length > 1 ? 16 : 0,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                      }
                    }
                  ]
              }
            ]}
        /></>
    )
}

export default ChartData;