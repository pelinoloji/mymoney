import React from "react";
import { Tabs, Col, Row } from "antd";
import FormElement from "./FormElement";

const { TabPane } = Tabs;

const Main = () => {
    const callback = key => {
        console.log(key);
    };
    return (
        <Row style={{ margin: "40px" }}>
            <Col span={10}>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Expense" key="1">
                        <FormElement expense />
                    </TabPane>

                    <TabPane tab="Income" key="2">
                        <FormElement expense={false} />
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    );
};

export default Main;
