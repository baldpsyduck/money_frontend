import ApiBuilder from "../pages/utils/ApiBuilder";
import data from "../static/icon/Title/data";
import {HTMLProps} from "react";


let tag = "graduate"

// 返回每个省份有多少人
export const queryProvinceList = () => {
    return ApiBuilder({
        method: "get",
        url: `${tag}/provinceList`
    })
}

// 传省份名称
export const queryProvinceInfo = (data:string) => {
    return ApiBuilder({
        method: "get",
        url: `${tag}/provinceInfo`,
        data: data
    })
}

// 传公司名称，返回这个公司的信息简介以及在这个公司的校友
export const queryCompanyInfo=(data:string)=>{
    return ApiBuilder({
        method:"get",
        url:`${tag}/companyInfo`,
        data:data
    })
}
