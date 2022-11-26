import React, {HTMLProps, useEffect, useState} from 'react';
import {Button, Modal} from 'antd';
import CompanyList from "../Collapse";

interface propsType {
    // 是否展示悬浮窗
    isModalOpen?: boolean;
    // 省份
    province?:string;
    sendValueToFather:any
}

export default function HoverList(props: propsType) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // var isModalOpen = props.isModalOpen;

    useEffect(() => {
        props.isModalOpen && setIsModalOpen(props.isModalOpen)
    }, [props.isModalOpen])

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
            <Modal title={props.province} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <CompanyList></CompanyList>
            </Modal>
        </>
    );
};

