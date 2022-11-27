import React, {useRef, useEffect, useState} from "react";
import * as echarts from "echarts";
import {chinaMapConfig} from "./config";
import Modal from "../../components/Modal";
import axios from "axios";
import {resData} from "./sd";
import {queryCityList} from "../../api/api";
import styled from "@emotion/styled";
import {province2city} from "./province2city";

// import Background from '../../assets/bg.jpg';

interface propsType {
    // 省份对应文件名
    provinceFileName?: string;
    // 省份
    province?: string;
}

export default function ProvinceMap(this: any, props: propsType) {
    const ref = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [geoJson, setGeoJson] = useState<object>();

    function getValueFromSon(param: boolean) {
        setIsModalOpen(param);
    }

    const [city, setCity] = useState<string>("");

    let mapInstance: any = null;
    let responseData: any = null;

    const renderMap = () => {
        const renderedMapInstance = echarts.getInstanceByDom(ref.current!);
        if (renderedMapInstance) {
            mapInstance = renderedMapInstance;
        } else {
            mapInstance = echarts.init(ref.current!);
        }

        // axios.get("").then((res)=>{
        //     mapInstance.setOption(
        //         chinaMapConfig({data: res.data.data, max: res.data.max, min: 0})
        //     );
        // })

        console.log(responseData);
        responseData.sort((a: any, b: any) => {
            return b.value - a.value;
        });
        let maxx = 0;
        if (responseData && responseData.length >= 1) {
            maxx = responseData[0].value;
        }
        if (province2city.has(props.province!)) {
            let bgValue = 0;
            let coreCity = province2city.get(props.province!)
            for (let i = 0; i < responseData.length; i += 1) {
                if (responseData[i].name === coreCity) {
                    bgValue = responseData[i].value
                }
            }
            responseData = responseData.filter(function (item: any) {
                return item.name != coreCity
            });
            responseData.unshift({
                    name: coreCity,
                    value: bgValue,
                }
            )
        }


        mapInstance.setOption(
            chinaMapConfig({
                data: responseData,
                max: maxx,
                min: 0,
                province: props.province,
            })
        );

        // mapInstance.setOption(
        //     chinaMapConfig({data: resData.data, max: resData.max, min: 0, province: props.province})
        // );

        mapInstance.on("click", function (params: any) {
            // console.log('myChart----click---:', params, '------', params.data.name)
            setIsModalOpen(true);
            setCity(params.name);
        });
    };

    useEffect(() => {
        // 读取对应省份数据
        queryCityList(props.province!)
            .then((res) => {
                responseData = res.data;
            })
            .then(() => {
                axios
                    .get(
                        "static/data/map/json/province/" + props.provinceFileName + ".json"
                    )
                    .then((res) => {
                        // setGeoJson(res.data);
                        echarts.registerMap(props.province!, {geoJSON: res.data});
                        renderMap();
                    })
                    .then(() => {
                        window.onresize = function () {
                            mapInstance.resize();
                        };
                        return () => {
                            mapInstance && mapInstance.dispose();
                        };
                    });
            });
    }, []);

    return (
        <Container>
            <>
                <div
                    style={{
                        width: "100%",
                        height: "90vh",
                    }}
                    ref={ref}
                ></div>
                <Modal
                    isModalOpen={isModalOpen}
                    city={city}
                    sendValueToFather={getValueFromSon.bind(this)}
                />
            </>
        </Container>
    );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 90vh;
`;
