import "./styles.css";
import React, {useRef, useEffect, useState} from "react";
import * as echarts from "echarts";
import {chinaMapConfig} from "./config";
import {geoJson} from "./geojson";
import {resData} from "./data";
import Modal from "../../components/Modal";
import axios from "axios";
import ProvinceMap from "../ProvinceMap";
import {provinceName2File} from "./provinceNameMap";
import {Button} from "antd";
import {queryProvinceList} from "../../api/api";


// import Background from '../../assets/bg.jpg';

export default function ChinaMap(this: any) {
    const ref = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isProvince, setIsProvince] = useState<boolean>(false);

    function getValueFromSon(param: boolean) {
        setIsModalOpen(param)
    }

    const [province, setProvince] = useState<string>("");

    let mapInstance: any = null;

    const renderMap = () => {
        const renderedMapInstance = echarts.getInstanceByDom(ref.current!);
        if (renderedMapInstance) {
            mapInstance = renderedMapInstance;
        } else {
            mapInstance = echarts.init(ref.current!);
        }

        queryProvinceList().then((res) => {
            res.data = res.data.map((item: any) => {
                item.name = item.name.replace("省", "")
                item.name = item.name.replace("市", "")
                return item
            })
            let tpArr = res.data
            tpArr.sort((a: any, b: any) => {
                return b.value - a.value
            })
            let maxx = 0;
            if (tpArr && tpArr.length >= 1) {
                maxx = tpArr[0].value
            }

            let allList = [];
            for (let i = 0; i < resData.data.length; i += 1) {
                allList.push(resData.data[i].name);
            }

            // res.data.remove()

            res.data = res.data.filter(function (item: any) {
                return item.name != "澳门"
            });
            let backMap = new Map();
            let originLength = res.data.length
            let bgValue = 0;
            for (let i = 0; i < originLength; i += 1) {
                if (res.data[i].name === "北京") {
                    bgValue = res.data[i].value
                }
                backMap.set(res.data[i].name, 0);
            }
            for (let i = 0; i < allList.length; i += 1) {
                if (!backMap.has(allList[i])) {
                    res.data.push({
                        value: 0,
                        name: allList[i],
                    })
                }
            }
            res.data.push({
                value: 38,
                name: "NULL"

            })

            res.data = res.data.filter(function (item: any) {

                return item.name != "北京"
            });
            res.data.unshift({
                    name: "北京",
                    value: bgValue,
                }
            )

            // console.log(res.data)
            mapInstance.setOption(
                chinaMapConfig({data: res.data, maxx: maxx, min: 0})
            );
            // console.log("--------------start----------------")
            // console.log(res.data)
            // console.log("--------------end backend----------------")
            // console.log(resData.data)
            // console.log("---------------end resData---------------")
            // mapInstance.setOption(
            //     chinaMapConfig({data: resData.data, maxx: resData.max, min: 0})
            // );
            mapInstance.on('click', function (params: any) {
                // alert(params.data.name)
                // console.log('myChart----click---:', params, '------', params.data.name);
                setIsProvince(true);
                mapInstance.dispose();
                setProvince(params.name);
                // alert(params.name)
                // @ts-ignore
                // ref.current.style = "display:none";
                // setIsModalOpen(true)
                // setProvince(params.data.name)
            });
        })


        // mapInstance.on('click', function (params: any) {
        //     // alert(params.data.name)
        //     // console.log('myChart----click---:', params, '------', params.data.name)
        //     setIsModalOpen(true)
        //     setProvince(params.data.name)
        // });


    };

    const init = () => {
        echarts.registerMap("china", {geoJSON: geoJson});
        renderMap();
        // @ts-ignore
        // ref.current.style =
        //     "width: \"100%\", height: \"90vh\"";
        window.onresize = function () {
            mapInstance.resize();
        };
        return () => {
            mapInstance && mapInstance.dispose();
        };
    }

    useEffect(() => {
        setIsProvince(false)
        init()
    }, []);

    // useEffect(() => {
    //
    // }, []);

    const divStyle = {
        width: "100%",
        height: "90vh",
        // backgroundImage: "url(../../assets/bg.jpg)"
        // backgroundImage: "url(" + require("../../assets/bg.jpg") + ")"
    }
    return (
        <div style={divStyle}>
            {isProvince && <Button type={"primary"} onClick={() => {
                setIsProvince(false)
                init()
            }}>返回</Button>}
            {/*{!isProvince && <div style={{*/}
            {/*    width: "100%",*/}
            {/*    height: "90vh",*/}
            {/*}} ref={ref}></div>}*/}
            {<div style={{
                width: "100%",
                height: "90vh",
            }} ref={ref}/>}
            {/*<Modal isModalOpen={isModalOpen} province={province}*/}
            {/*       sendValueToFather={getValueFromSon.bind(this)}*/}
            {/*/>*/}
            {
                isProvince && <ProvinceMap province={province} provinceFileName={provinceName2File.get(province)}/>
            }
        </div>
    );
}
