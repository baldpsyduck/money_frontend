import React from 'react';
import {Descriptions} from 'antd';
import {Alumnus} from "../Modal";
import data from "../../static/icon/Title/data";


interface propsType {
    // 是否展示悬浮窗
    isModalOpen?: boolean;
    // 市
    city?: string;
    user: Alumnus
}

export default function UserDescription(props: propsType) {
    return (
        <Descriptions >
            <Descriptions.Item label="姓名">{props.user.name}</Descriptions.Item>
            <Descriptions.Item label="电话">{props.user.phone}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>
        </Descriptions>
    )
};
