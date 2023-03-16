import { Chart } from 'chart.js/auto';
import 'chart.js/auto';
import styled from 'styled-components';
import { useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';




function CheckTest():JSX.Element {
  const data = {
    datasets: [
      {
        data: [0, 255, 370, 15, 255, 370, 15, 255, 370, 15, 0, 255, 370, 15, 255, 370, 15, 255, 370, 15, 0, 255, 370, 15, 255, 370, 15, 255, 370, 15], // each slice represents 25% of the chart
        backgroundColor: ['red'], // color for each slice
        borderColor: ['red'], // color for each slice
      },
      {
        data: [12,13,555,22,566,123,21,3,5,12,12,13,555,22,566,123,21,3,5,12,12,13,555,22,566,123,21,3,5,12,], // each slice represents 25% of the chart
        backgroundColor: ['blue'], // color for each slice
        borderColor: ['blue'],
      },
    ],
    labels: ['Age 1', 'Age 2', 'Age 3', 'Age 4', 'Age 1', 'Age 2', 'Age 3', 'Age 4', 'Age 3', 'Age 4', 'Age 1', 'Age 2', 'Age 3', 'Age 4', 'Age 1', 'Age 2', 'Age 3', 'Age 4', 'Age 3', 'Age 4', 'Age 1', 'Age 2', 'Age 3', 'Age 4', 'Age 1', 'Age 2', 'Age 3', 'Age 4', 'Age 3', 'Age 4'] // label for each slice
  };
  
  return (
    <div className='h-[30rem] w-[50rem]'>
      <Line typeof='line' data={data}/>
    </div>
  )
}

export default CheckTest;


