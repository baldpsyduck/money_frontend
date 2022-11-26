import ApiBuilder from "../pages/utils/ApiBuilder";
import data from "../static/icon/Title/data";
import {HTMLProps} from "react";


let tag = ""

export const queryGraduateByYear = (year: string) => {
    return ApiBuilder({
        method: "get",
        data: {
            year: year
        },
        url: `${tag}/graduate`
    })
}

export const queryResearchByYear = (year: string) => {
    return ApiBuilder({
        method: "get",
        data: {
            year: year
        },
        url: `${tag}/researchdata`
    })
}

export const queryWorkByYear = (year: string) => {
    return ApiBuilder({
        method: "get",
        data: {
            year: year
        },
        url: `${tag}/workdata`
    })
}

export const queryAllYearData = () => {
    return ApiBuilder({
        method: "get",
        url: `${tag}/allyear`
    })
}

// 返回每个省份有多少人
export const queryProvinceList = () => {
    return ApiBuilder({
        method: "get",
        url: `${tag}/province`
    })
}

// 返回每个市有多少人
export const queryCityList = (province: string) => {
    return ApiBuilder({
        method: "get",
        data: {
            province
        },
        url: `${tag}/city`
    })
}

// 获取某市全部公司信息
export const queryCompanyList = (city: string) => {
    return ApiBuilder({
        method: "get",
        url: `${tag}/map`,
        data: data
    })
}

// 传公司名称，返回这个公司的信息简介以及在这个公司的校友
export const queryCompanyInfo = (data: string) => {
    return ApiBuilder({
        method: "get",
        url: `${tag}/companyInfo`,
        data: data
    })
}
