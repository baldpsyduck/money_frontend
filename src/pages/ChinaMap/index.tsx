import "./styles.css";
import React, {useRef, useEffect, useState} from "react";
import * as echarts from "echarts";
import {chinaMapConfig} from "./config";
import {geoJson} from "./geojson";
import {resData} from "./data";
import Modal from "../../components/Modal";
import axios from "axios";

// import Background from '../../assets/bg.jpg';

export default function ChinaMap(this: any) {
    const ref = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
        mapInstance.setOption(
            chinaMapConfig({data: resData.data, max: resData.max, min: 0})
        );

        mapInstance.on("dbclick", function (params: any) {
            setIsModalOpen(true)
        })
        mapInstance.on('click', function (params: any) {
            // alert(params.data.name)
            console.log('myChart----click---:', params, '------', params.data.name)
            setIsModalOpen(true)
            setProvince(params.data.name)
        });

    };

    useEffect(() => {
        echarts.registerMap("china", {geoJSON: geoJson});
        renderMap();
    }, []);

    useEffect(() => {
        window.onresize = function () {
            mapInstance.resize();
        };
        return () => {
            mapInstance && mapInstance.dispose();
        };
    }, []);

    const divStyle = {
        width: "100%",
        height: "90vh",
        // backgroundImage: "url(../../assets/bg.jpg)"
        // backgroundImage: "url(" + require("../../assets/bg.jpg") + ")"
    }

    return (
        <div style={divStyle}>
            <div style={{
                width: "100%",
                height: "90vh",
            }}
                 ref={ref}></div>
            <Modal isModalOpen={isModalOpen} province={province}
                   sendValueToFather={getValueFromSon.bind(this)}
            />
        </div>
    );
}
