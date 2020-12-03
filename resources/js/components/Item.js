import React from "react";
import { Form, Input, Button, DatePicker } from "antd";

const Item = ({ expense }) => {
    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                layout="vertical"
                // rowClassName={record => (record.expense ? "green" : "red")}
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
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    label="Currency"
                    name="currency"
                    rules={[
                        {
                            required: true,
                            message: "Please pick a currency!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tag"
                    name="tag"
                    rules={[
                        {
                            required: true,
                            message: "Please pick a category!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Date" name="transaction_date">
                    <DatePicker />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" id="post">
                        {expense ? "Add Expense" : "Add Income"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Item;
