import React from "react";
import { Tabs, Col, Row } from "antd";
import FormItem from "./FormItem";

const { TabPane } = Tabs;

const Main = () => {
    //
    const callback = key => {
        console.log(key);
    };
    return (
        <Row style={{ margin: "40px" }}>
            <Col span={10}>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Expenses" key="1">
                        <FormItem />
                    </TabPane>

                    <TabPane tab="Income" key="2">
                        <FormItem />
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    );
};

export default Main;
