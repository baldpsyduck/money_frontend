import React, {HTMLProps, useEffect, useState} from 'react';
import {Button, Modal} from 'antd';
import CompanyList from "../Collapse";
import axios from "axios";
import {queryCompanyList} from "../../api/api";

interface propsType {
    // 是否展示悬浮窗
    isModalOpen?: boolean;
    // 市
    city?: string;
    sendValueToFather: any
}

export interface Alumnus {
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
    description: string
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

    useEffect(() => {
        queryCompanyList(props.city!).then((res) => {
            setCompanyList(res.data)
        })
        // axios.get("static/data/company.json").then((res) => {
        //     //res.data
        //     setCompanyList(res.data)
        // })
    }, [])

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
            <Modal title={props.city} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
                {/*{companyList && <CompanyList data={companyList}/>}*/}
                <CompanyList data={companyList!}/>
            </Modal>
        </>
    );
};

