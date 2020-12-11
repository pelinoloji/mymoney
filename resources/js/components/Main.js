import React from "react";
import { Tabs, Col, Row } from "antd";
import Transactions from "./Transactions";

const { TabPane } = Tabs;

const Main = () => {
    return (
        <Row style={{ margin: "40px" }} justify="center">
            <Col span={10}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Expense" key="1">
                        <Transactions expense />
                    </TabPane>

                    <TabPane tab="Income" key="2">
                        <Transactions expense={false} />
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    );
};

export default Main;
