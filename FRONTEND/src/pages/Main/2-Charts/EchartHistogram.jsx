import React        from 'react';
import ReactEcharts from 'echarts-for-react';

export default function Histogram(props)
{
  const option = {
            color: ['#009688'],
            tooltip: {formatter: "{c}"},
            xAxis: {type: 'category'},
            yAxis: {show: false, type: 'value'},
            series: [{
                type: 'bar',
                barWidth: '90%',
                data: [120, 200, 150, 80, 70, 110, 130, 150, 80, 70, 110, 130]
            }]
        };

  return (
    <ReactEcharts option={option} />
  );
}
