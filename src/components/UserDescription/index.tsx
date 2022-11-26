import React from 'react';
import {Descriptions} from 'antd';


interface propsType {
    // 是否展示悬浮窗
    isModalOpen?: boolean;
    // 市
    city?: string;
}

export default function UserDescription(props: propsType) {
    return (
        <Descriptions title="User Info">
            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Address">
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
        </Descriptions>
    )
};
