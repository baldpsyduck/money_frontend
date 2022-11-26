import React, {HTMLProps, useEffect, useState} from 'react';
import {Button, Modal} from 'antd';
import CompanyList from "../Collapse";
import axios from "axios";

interface propsType {
    // 是否展示悬浮窗
    isModalOpen?: boolean;
    // 市
    city?: string;
    sendValueToFather: any
}

interface Alumnus {
    name?: string
    phone?: string
    email?: string
}

export interface Company {
    // 公司名称
    companyName?: string;
    // 在该公司的人数
    number?: number;
    // 公司简介
    sendValueToFather: any
    // 公司链接
    link: string
    // 校友列表
    alumnus: Alumnus[]
}

export default function HoverList(props: propsType) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [companyList, setCompanyList] = useState<Company[]>();

    // var isModalOpen = props.isModalOpen;

    useEffect(() => {
        props.isModalOpen && setIsModalOpen(props.isModalOpen)

    }, [props.isModalOpen])

    useEffect(()=>{
        axios.get("static/data/company.json").then((res) => {
            //res.data
            setCompanyList(res.data)
        })
    },[])

    const showModal = () => {
        setIsModalOpen(true);
        props.sendValueToFather(true)
    };

    const handleOk = () => {
        setIsModalOpen(false);
        props.sendValueToFather(false)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        props.sendValueToFather(false)
    };

    return (
        <>
            {/*<Button type="primary" onClick={showModal}>*/}
            {/*    Open Modal*/}
            {/*</Button>*/}
            <Modal title={props.city} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {/*{companyList && <CompanyList data={companyList}/>}*/}
                <CompanyList data={companyList!}/>
            </Modal>
        </>
    );
};

