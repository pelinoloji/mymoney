import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        key: "action",
        render: (text, record) => (
            <Space size="middle">
                <Link to="/transactions/">Edit {record.name}</Link>
                <Link>Delete</Link>
            </Space>
        )
    }
];

const FormItem = () => {
    try {
        const [results, setResults] = useState([]);

        const onFinishFailed = errorInfo => {
            console.log("Failed:", errorInfo);
        };
        const onChange = (date, dateString) => {
            console.log(date, dateString);
        };
        const handleResult = () => {
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
                    currency: data.currency,
                    date: data.date
                }
            })
                .then(response => {
                    handleResult();
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        };

        useEffect(() => {
            handleResult();
        }, []);

        const config = {
            rules: [
                {
                    type: "object",
                    required: true,
                    message: "Please select time!"
                }
            ]
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

                    <Form.Item label="Date" name="date" {...config}>
                        <Space direction="vertical">
                            <DatePicker onChange={e => console.log(e)} />
                        </Space>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" id="post">
                            Add Expense
                        </Button>
                    </Form.Item>

                    <Divider />
                    <h3>Results</h3>
                    <div>
                        {!!results?.length ? (
                            <Table
                                key={results.id}
                                dataSource={results}
                                columns={columns}
                                size="middle"
                            />
                        ) : null}
                    </div>
                </Form>
            </>
        );
    } catch (err) {
        console.log(err, "render");
        return null;
    }
};
export default FormItem;
