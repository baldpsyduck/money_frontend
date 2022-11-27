import React, { PureComponent, useEffect, useState } from "react";
import * as eCharts from "echarts";
import { Select } from "antd";
import EChart from "../../components/EChartTemplate";
import EChartTemplate from "../../components/EChartTemplate";
import axios from "axios";
import {
  queryAllYearData,
  queryGraduateByYear,
  queryResearchByYear,
  queryWorkByYear,
} from "../../api/api";
import styled from "@emotion/styled";
import { useAppSelector } from "store/hooks";

export default function EchartsTest() {
  const [eChartsRef, setEChartRef] = useState<any>(React.createRef());
  // 毕业去向饼状图
  const [graduateData, setGraduateData] = useState<any>();
  // 工作方向饼状图
  const [workDirectionData, setWorkDirectionData] = useState<any>();
  // 研究方向饼状图
  const [researchDirectionData, setResearchDirectionData] = useState<any>();

  const theme = useAppSelector((s) => s.style.style);

  const [options, setOptions] = useState<any>();
  const [option1, setOption1] = useState<any>();
  const [option2, setOption2] = useState<any>();
  const [option3, setOption3] = useState<any>();
  const [option4, setOption4] = useState<any>();
  const [option5, setOption5] = useState<any>();

  const handleChange = (value: string) => {
    queryData(value);
  };

  function queryData(year: string) {
    // 绘制毕业去向饼状图
    queryGraduateByYear(year).then((res) => {
      let option1 = {
        title: {
          text: "毕业去向饼状图",
          x: "center",
          y: "bottom",
          textStyle: {
            color: theme.text,
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie", // 设置图表类型为饼图
            radius: "55%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: res.data,
          },
        ],
      };
      setOption1(option1);
    });

    // 绘制工作去向饼状图
    queryWorkByYear(year).then((res) => {
      let option2 = {
        title: {
          text: "工作去向饼状图",
          x: "center",
          y: "bottom",
          textStyle: {
            color: theme.text,
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie", // 设置图表类型为饼图
            radius: "55%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: res.data,
          },
        ],
      };
      setOption2(option2);
    });

    queryResearchByYear(year).then((res) => {
      let option3 = {
        title: {
          text: "研究方向饼状图",
          x: "center",
          y: "bottom",
          textStyle: {
            color: theme.text,
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie", // 设置图表类型为饼图
            radius: "55%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: res.data,
          },
        ],
      };
      setOption3(option3);
    });

    queryAllYearData().then((res) => {
      let workList: any = [];
      let examReList: any = [];
      let exemptList: any = [];
      let phdList: any = [];
      let yearList = [];
      const objChangeMap = (obj: any) => {
        let map = new Map();
        for (let key in obj) {
          map.set(key, obj[key]);
        }
        return map;
      };
      let workMap: Map<any, any> = objChangeMap(res.data["工作"]);
      let examReMap: Map<any, any> = objChangeMap(res.data["考研"]);
      let exemptMap: Map<any, any> = objChangeMap(res.data["保研"]);
      let phdMap: Map<any, any> = objChangeMap(res.data["直博"]);

      for (let year = 2014; year <= 2023; year++) {
        yearList.push(year);
        workList.push(
          workMap.has(String(year)) ? workMap.get(String(year)) : 0
        );
        examReList.push(
          examReMap.has(String(year)) ? examReMap.get(String(year)) : 0
        );
        exemptList.push(
          exemptMap.has(String(year)) ? exemptMap.get(String(year)) : 0
        );
        phdList.push(phdMap.has(String(year)) ? phdMap.get(String(year)) : 0);
      }

      var option4 = {
        title: {
          text: "历年毕业去向汇总图",
          // left: '20px',
          x: "center",
          y: "bottom",
          textStyle: {
            color: theme.text,
            fontSize: 17,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          itemWidth: 15,
          itemHeight: 15,
          data: ["工作", "考研", "保研", "直博"],
        },
        xAxis: {
          data: yearList,
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "工作",
            type: "bar",
            stack: "使用情况",
            data: workList,
            itemStyle: {
              normal: { color: "#FF8849" },
            },
          },
          {
            name: "考研",
            type: "bar",
            stack: "使用情况",
            data: examReList,
            itemStyle: {
              normal: { color: "#3FBB49" },
            },
          },
          {
            name: "保研",
            type: "bar",
            stack: "使用情况",
            data: exemptList,
            itemStyle: {
              normal: { color: "#394e5d" },
            },
          },
          {
            name: "直博",
            type: "bar",
            stack: "使用情况",
            data: phdList,
            itemStyle: {
              normal: { color: "rgba(117,20,182,0.57)" },
            },
          },
        ],
      };
      console.log(year);

      if (year === "whole") {
        setOption1(undefined);
        setOption2(undefined);
        setOption3(undefined);
      }
      setOption4(option4);
    });
  }

  useEffect(() => {
    let options: any = [];
    for (let year = 2014; year <= 2023; year++) {
      options.push({
        value: year,
        label: year,
      });
    }
    options.push({
      value: "whole",
      label: "总览",
    });
    setOptions(options);
    queryData("whole");
  }, []);

  useEffect(() => {
    if (option1)
      setOption1((op: any) => {
        const { title } = op;
        const myTitle = {
          ...title,
          textStyle: {
            color: theme.text,
          },
        };
        return { ...op, title: myTitle };
      });
    if (option2)
      setOption2((op: any) => {
        const { title } = op;
        const myTitle = {
          ...title,
          textStyle: {
            color: theme.text,
          },
        };
        return { ...op, title: myTitle };
      });
    if (option3)
      setOption3((op: any) => {
        const { title } = op;
        const myTitle = {
          ...title,
          textStyle: {
            color: theme.text,
          },
        };
        return { ...op, title: myTitle };
      });
    if (option4)
      setOption4((op: any) => {
        const { title } = op;
        const myTitle = {
          ...title,
          textStyle: {
            color: theme.text,
          },
        };
        return { ...op, title: myTitle };
      });
  }, [theme]);

  return (
    <Container>
      <Select
        defaultValue="whole"
        style={{ width: 120,position:'absolute' ,zIndex:999,left:0}}
        onChange={handleChange}
        options={options}
      />
      {option4 && (
        <EChartTemplate
          style={{
            width: 600,
            height: 400,
          }}
          option={option4}
        />
      )}
      {option1 && (
        <EChartTemplate
          style={{
            width: 600,
            height: 400,
          }}
          option={option1}
        />
      )}

      {option2 && (
        <EChartTemplate
          style={{
            width: 600,
            height: 400,
          }}
          option={option2}
        />
      )}

      {option3 && (
        <EChartTemplate
          style={{
            width: 600,
            height: 400,
          }}
          option={option3}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding:5px;
  justify-content: space-around;
`;
