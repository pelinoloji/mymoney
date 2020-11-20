import React from "react";
import { Select, Form, Input, Button, DatePicker, Space, Divider } from "antd";

const { Option } = Select;

const FormItem = () => {
    return (
        <>
            <Form
                id="formitem"
                name="basic"
                initialValues={{ remember: true }}
                layout="vertical"
            >
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: "Please input an amount!"
                        }
                    ]}
                >
                    <Input style={{ width: "250px" }} />
                    <Select
                        defaultValue="GBP"
                        style={{
                            width: "80px"
                        }}
                    >
                        <Option value="gbp">GBP</Option>
                        <Option value="usd">USD</Option>
                        <Option value="euro">EURO</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: "Please pick a category!"
                        }
                    ]}
                >
                    <Select
                        defaultValue="Please pick a category"
                        style={{ width: "200px" }}
                    >
                        <Option value="beauty">Beauty</Option>
                        <Option value="shopping">Shopping</Option>
                    </Select>
                    <Space direction="vertical">
                        <DatePicker
                            style={{
                                width: "110px",
                                marginLeft: "15px"
                            }}
                        />
                    </Space>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Expense
                    </Button>
                </Form.Item>
                <Divider />
            </Form>
        </>
    );
};

export default FormItem;
