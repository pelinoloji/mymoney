import React from "react";
import { Select, Form, Input, Button, DatePicker, Space, Divider } from "antd";

const { Option } = Select;
const axios = require("axios").default;

const FormItem = () => {
    const handleSubmit = e => {
        // stop browser's default behaviour of reloading on form submit
        e.preventDefault();
        const headers = {
            Authorization: "Bearer my-token",
            "Content-Type": "text/plain;charset=utf-8"
        };
        axios
            .post(
                "/api/transactions",
                {
                    amount: e.target.value,
                    tag: "beauty"
                },
                { headers }
            )
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    };
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
                    label="tag"
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
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleSubmit}
                        id="post"
                    >
                        Add Expense
                    </Button>
                </Form.Item>
                <Divider />
            </Form>
        </>
    );
};

export default FormItem;
