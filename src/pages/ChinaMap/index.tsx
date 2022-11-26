import "./styles.css";
import React, {useRef, useEffect, useState} from "react";
import * as echarts from "echarts";
import {chinaMapConfig} from "./config";
import {geoJson} from "./geojson";
// import {resData} from "./data";
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
            console.log(res.data)
            res.data.sort((a: any, b: any) => {
                return a.value - b.value
            })
            let maxx = 0;
            if(res.data&&res.data.length>=1){
                maxx = res.data[0].value
            }
            mapInstance.setOption(
                chinaMapConfig({data: res.data, max: maxx, min: 0})
            );
            mapInstance.on('click', function (params: any) {
                // alert(params.data.name)
                console.log('myChart----click---:', params, '------', params.data.name);
                setIsProvince(true);
                mapInstance.dispose();
                setProvince(params.data.name);
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
