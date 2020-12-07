import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, DatePicker, Space, Divider, Table } from "antd";
import "../../sass/app.scss";

import DropDownInput from "./DropDownInput";
import {
    handleResult,
    addTransaction,
    updateTransaction,
    deleteTransaction
} from "./api";

const { RangePicker } = DatePicker;

const FormElement = ({ expense }) => {
    try {
        const [results, setResults] = useState([]);
        const [amount, setAmount] = useState(0);
        const [currency, setCurrency] = useState("");
        const [tag, setTag] = useState("");
        const [date, setDate] = useState("");
        const [currentId, setCurrentId] = useState(0);
        const [currencies, setCurrencies] = useState(["GBP", "EURO", "USD"]);
        const [tags, setTags] = useState(["Beauty", "Shopping"]);

        const onFinishFailed = errorInfo => {
            alert(
                `Hi there 👋 Please make sure all fields are filled in correctly. `,
                errorInfo
            );
        };

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
                    expense: expense,
                    currency: data.currency,
                    transaction_date: data.transaction_date.format("YYYY-MM-DD")
                }
            })
                .then(response => {
                    console.log(response);
                    handleResult();
                })
                .catch(error => {
                    console.log(error);
                });
        };

        const updateTransaction = data => {
            axios({
                method: "put",
                url: `api/transactions/${currentId}`,
                data: {
                    amount: data.amount,
                    tag: data.tag,
                    expense: expense,
                    currency: data.currency,
                    transaction_date: data.transaction_date.format("YYYY-MM-DD")
                }
            }).then(response => {
                console.log(response.data, "data");
                setCurrentId(0);
                handleResult();
            });
        };

        const deleteTransaction = id => {
            axios.delete(`api/transactions/${id}`).then(response => {
                console.log(response, "res");
                handleResult();
            });
        };

        const columns = [
            {
                title: "Amount",
                dataIndex: "amount"
            },
            {
                title: "Currency",
                dataIndex: "currency"
            },
            {
                title: "Category",
                dataIndex: "tag"
            },
            {
                title: "Date",
                dataIndex: "date"
            },
            {
                title: "Action",
                dataIndex: "id",
                render: id => (
                    <Space size="middle">
                        <Link to="/" onClick={() => editTransaction(id)}>
                            Edit
                        </Link>
                        <Link to="/" onClick={() => deleteTransaction(id)}>
                            Delete
                        </Link>
                    </Space>
                )
            }
        ];

        const editTransaction = id => {
            const current = results.filter(a => a.id === id);

            setCurrentId(id);
            setAmount(current.amount);
            setCurrency(current.currency);
            setTag(current.tag);
            setDate(current.date);
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
                    onFinish={currentId ? updateTransaction : addTransaction}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    rowClassName={record => (record.expense ? "green" : "red")}
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

                    <DropDownInput currencyy />

                    <DropDownInput taggs />

                    <Form.Item
                        label="Date"
                        name="transaction_date"
                        value={date}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" id="post">
                            {currentId
                                ? "Update"
                                : expense
                                ? "Add Expense"
                                : "Add Income"}
                        </Button>
                    </Form.Item>
                    <Divider />
                    {!currentId ? (
                        <div>
                            <h3> {`Total: £ ${totalAmount}`}</h3>
                            <Space direction="vertical" size={12}>
                                <RangePicker />
                            </Space>
                            <Button
                                type="primary"
                                htmlType=""
                                style={{ margin: 10 }}
                            >
                                Filter
                            </Button>

                            <div>
                                {!!results?.length ? (
                                    <Table
                                        key={results.id}
                                        dataSource={results}
                                        columns={columns}
                                        size="middle"
                                        rowClassName={record =>
                                            record.expense ? "red" : "green"
                                        }
                                    />
                                ) : null}
                            </div>
                        </div>
                    ) : null}
                </Form>
            </>
        );
    } catch (err) {
        console.log(err, "render");
        return null;
    }
};
export default FormElement;
