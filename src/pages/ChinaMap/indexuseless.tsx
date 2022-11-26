import React, {PureComponent, useEffect, useRef, useState} from "react";
import * as eCharts from "echarts";
import axios, {AxiosResponse} from "axios";
import {ECharts} from "echarts";
import chinaMap from "assets/china.json";

export default function ChinaMap() {
    const eChartsRef = useRef<HTMLDivElement>(null)


    const [geoCoordMap, setGeoCoordMap] = useState<any | undefined>(undefined)
    // const [myChart, setMyChart] = useState<any>()
    const [myChart, setMyChart] = useState<ECharts>() //用来勾住生成后的 图表实例对象

    const getCityData = () => {
        axios.get('static/data/map/cityData.json').then((res) => {
            setGeoCoordMap(res.data);
        })
    };
    useEffect(() => {
        // if (geoCoordMap === undefined) {
        //     return
        // }
        geoCoordMap && getMyChart();
    }, [geoCoordMap])

    // useEffect(() => {
    //     if (myChart === undefined) {
    //         return
    //     }
    //     getMyChart();
    // }, [myChart])

    const init = (options: any) => {
        eCharts.registerMap("china", {geoJSON: chinaMap});
        // var echarts = eCharts.init(eChartsRef.current!);
        var echarts = eCharts.init(document.getElementById("chinaMap")!);
        // eChartsRef.current && setMyChart(eCharts.init(eChartsRef.current));
        // setMyChart(eCharts.init(eChartsRef.current!));
        echarts.setOption(options)
        let legendArr = options.series
        legendArr.forEach((data: any) => {
            data.selected = true;
        })
        // this.$root.charts.push(this.myChart)
        window.addEventListener('resize', function () {
            echarts.resize()
        })
        eChartsRef.current && setMyChart(myChart);
    };

    const convertData = (data: any) => {
        let res = [];
        for (let i = 0; i < 4; i++) {
            let l = data.length
            let x = parseInt(String(Math.random() * l))
            let geoCoord = geoCoordMap[data[x].name]
            // let geoCoord = this.geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[x].name,
                    // name: data[x].name,
                    value: geoCoord.concat(Math.random() * 200)
                    // value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };
    const getMyChart = () => {
        axios.get('static/data/map/testData.json').then((res) => {
            let options = {
                // backgroundColor: '#404a59',
                title: {
                    show: false
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params: any) {
                        return params.name + ' : ' + params.value[2];
                    }
                },
                legend: {
                    show: false
                },
                visualMap: {
                    min: 0,
                    max: 200,
                    bottom: 50,
                    splitNumber: 5,
                    inRange: {
                        color: ['#255B78', '#2A7484', '#2F9696', '#3BBCB0', '#51D4EB']
                    },
                    textStyle: {
                        color: '#fff'
                    }
                },
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    zoom: 1,
                    top: 50,
                    itemStyle: {
                        normal: {
                            color: '#3c4247',
                            opacity: 0.6,
                            borderColor: 'rgba(255, 255, 255, 0.35)'
                        },
                        emphasis: {
                            color: '#2a333d'
                        }
                    }
                },
                series: [{
                    name: '标签1',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbolSize: function (val: any) {
                        return val[2] / 6;
                    },
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    },
                    data: convertData(res.data)
                }, {
                    name: '标签2',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbolSize: function (val: any) {
                        return val[2] / 6;
                    },
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    },
                    data: convertData(res.data)
                }, {
                    name: '标签3',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbolSize: function (val: any) {
                        return val[2] / 6;
                    },
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    },
                    data: convertData(res.data)
                }]
            }
            init(options)
        });
    };


    useEffect(() => {
        getCityData();
    }, [])

    return (
        <div>
            <div ref={eChartsRef}></div>

            {/*<div className="point">*/}
            {/*    <div className="main"></div>*/}
            {/*</div>*/}
            <div id="chinaMap">
            </div>
        </div>
    )
}


