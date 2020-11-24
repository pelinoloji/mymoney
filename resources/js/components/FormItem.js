import React, { useState, useEffect } from "react";
import {
    Select,
    Form,
    Input,
    Button,
    DatePicker,
    Space,
    Divider,
    Table
} from "antd";
import axios from "axios";

const { Option } = Select;

const FormItem = () => {
    const [results, setResults] = useState([]);

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };

    const handleResult = e => {
        // stop browser's default behaviour of reloading on form submit
        e.preventDefault();

        axios
            .get("/api/transactions")
            .then(response => {
                console.log(response);
                setResults(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const addTransaction = data => {
        axios({
            method: "post",
            url: "/api/transactions",
            data: {
                amount: data.amount,
                tag: data.tag,
                expense: true,
                currency: data.currency
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };
    return (
        <>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={addTransaction}
                onFinishFailed={onFinishFailed}
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
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Currency"
                    name="currency"
                    rules={[
                        {
                            required: true,
                            message: "Please pick a category!"
                        }
                    ]}
                >
                    <Select>
                        <Option value="gbp">GBP</Option>
                        <Option value="usd">USD</Option>
                        <Option value="euro">EURO</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Tag" name="tag">
                    <Select>
                        <Option value="beauty">Beauty</Option>
                        <Option value="shopping">Shopping</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Date" name="date">
                    <Space direction="vertical">
                        <DatePicker />
                    </Space>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        // onClick={handleResult}
                        id="post"
                    >
                        Add Expense
                    </Button>
                </Form.Item>

                <Divider />
                <h3>Results</h3>
                <div>
                    {results.map(result => {
                        const dataSource = [
                            {
                                amount: result.amount,
                                tag: result.tag,
                                date: result.created_at
                            }
                        ];
                        const columns = [
                            {
                                title: "Amount",
                                dataIndex: "amount",
                                key: "amount"
                            },
                            {
                                title: "Category",
                                dataIndex: "tag",
                                key: "tag"
                            },
                            {
                                title: "Date",
                                dataIndex: "date",
                                key: "date"
                            },
                            {
                                title: "Action",
                                dataIndex: "action",
                                key: "action"
                            }
                        ];
                        return (
                            <Table
                                key={result.id}
                                dataSource={dataSource}
                                columns={columns}
                                size="middle"
                            />
                        );
                    })}
                </div>
            </Form>
        </>
    );
};

export default FormItem;
