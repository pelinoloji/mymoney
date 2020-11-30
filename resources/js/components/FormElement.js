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
    Table,
    Statistic
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

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
        dataIndex: "transaction_date",
        key: "transaction_date"
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (text, record) => (
            <Space size="middle">
                <Link to="/transaction/edit">Edit {record.name}</Link>
                <Link>Delete</Link>
            </Space>
        )
    }
];

const FormElement = () => {
    try {
        const [results, setResults] = useState([]);
        const [currencies, setCurrencies] = useState(["GBP", "EURO", "USD"]);
        const [tags, setTags] = useState(["Beauty", "Shopping"]);
        const [newTitle, setNewTitle] = useState("");
        const onFinishFailed = errorInfo => {
            alert(
                `Hi there 👋 Please make sure all fields are filled in correctly. `,
                errorInfo
            );
        };

        function onChange(date, dateString) {
            console.log(date, dateString, "date");
        }

        const handleResult = () => {
            axios
                .get("/api/transactions")
                .then(response => {
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
                    transaction_date: "2020-11-05"
                }
            })
                .then(response => {
                    handleResult();
                })
                .catch(error => {
                    console.log(error);
                });
        };

        useEffect(() => {
            handleResult();
        }, []);

        const amountArr = results.map((res, index) => {
            return res.amount;
        });
        const totalAmount = amountArr.reduce((acc, res) => acc + res, 0);

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
                        <Select
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: "4px 0" }} />
                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "nowrap",
                                            padding: 8
                                        }}
                                    >
                                        <Input
                                            style={{ flex: "auto" }}
                                            value={newTitle}
                                            onChange={e =>
                                                setNewTitle(e.target.value)
                                            }
                                        />
                                        <a
                                            style={{
                                                flex: "none",
                                                padding: "8px",
                                                display: "block",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                setCurrencies([
                                                    ...currencies,
                                                    newTitle
                                                ]);
                                                setNewTitle(" ");
                                            }}
                                        >
                                            <PlusOutlined /> Add item
                                        </a>
                                    </div>
                                </div>
                            )}
                        >
                            {!!currencies?.length
                                ? currencies.map((item, index) => {
                                      return <Option key={item}>{item}</Option>;
                                  })
                                : null}
                        </Select>
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
                        <Select
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: "4px 0" }} />
                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "nowrap",
                                            padding: 8
                                        }}
                                    >
                                        <Input
                                            style={{ flex: "auto" }}
                                            value={newTitle}
                                            onChange={e =>
                                                setNewTitle(e.target.value)
                                            }
                                        />
                                        <a
                                            style={{
                                                flex: "none",
                                                padding: "8px",
                                                display: "block",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                setTags([...tags, newTitle]);
                                                setNewTitle("");
                                            }}
                                        >
                                            <PlusOutlined /> Add item
                                        </a>
                                    </div>
                                </div>
                            )}
                        >
                            {!!tags?.length
                                ? tags.map((item, index) => {
                                      return <Option key={item}>{item}</Option>;
                                  })
                                : null}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Date" name="transaction_date">
                        <Space direction="vertical">
                            <DatePicker onChange={onChange} />
                        </Space>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" id="post">
                            Add Expense
                        </Button>
                    </Form.Item>
                    <Divider />
                    <h3> {`Total: £ ${totalAmount}`}</h3>

                    <Divider />
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
export default FormElement;
