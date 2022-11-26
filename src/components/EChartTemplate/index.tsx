import React, {PureComponent, useEffect, useState} from "react";
import * as eCharts from "echarts";
import {Select} from 'antd';

interface propsType {
    style: any
    option: any
}

export default function EChartTemplate(props: propsType) {

    const{option,style}=props

    const [eChartsRef, setEChartRef] = useState<any>(React.createRef())

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    
    useEffect(() => {
        const myChart = eCharts.init(eChartsRef.current);
        // 设置样式
        eChartsRef.current.style = props.style
        // 设置对应
        myChart.setOption(option);
    },[option])

    return (
        <>
            <div ref={eChartsRef} style={{
                width: 600,
                height: 400,
                margin: 100
            }}></div>
        </>
    )
}


