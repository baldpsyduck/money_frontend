import React, {useEffect, useState} from 'react';
import {Collapse} from 'antd';
import {Company} from "../Modal";
import UserDescription from "../UserDescription";

const {Panel} = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

interface propsType {
    data: Company[]
}

export default function CompanyList(props: propsType) {

    const [companyList, setCompanyList] = useState();

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    useEffect(() => {
        let companyList: any = []
        for (let i = 0; i < props.data.length; i += 1) {  // for循环数组
            if (props.data[i] !== null) {
                let tpList = []
                for (let j = 0; j < props.data[i].alumnus.length; j += 1) {
                    tpList.push(<UserDescription/>)
                }
                companyList.push(
                    <Panel header={props.data[i].companyName} key={i}>
                        <p>{text}</p>
                        {tpList}
                    </Panel>
                )
            }
        }
        setCompanyList(companyList);
    }, [])

    return (
        <Collapse defaultActiveKey={['1']} onChange={onChange}>
            {companyList}
        </Collapse>
    );
};


