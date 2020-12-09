import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Form,
    Input,
    Button,
    DatePicker,
    Space,
    Divider,
    Table,
    Select,
    Row,
    Col,
    Radio
} from "antd";
import moment from "moment";

import "../../sass/app.scss";
import DropDownInput from "./DropDownInput";
import MonthsDropdown from "./MonthsDropdown";
// import * as api from "./api";
const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";
const monthFormat = "YYYY/MM";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const FormElement = ({ expense }) => {
    try {
        const [results, setResults] = useState([]);
        const [amount, setAmount] = useState(0);
        const [currency, setCurrency] = useState("");
        const [tag, setTag] = useState("");
        const [date, setDate] = useState("");
        const [currentId, setCurrentId] = useState(0);
        const [total, setTotal] = useState([]);
        const [value, setValue] = useState(1);

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
                    setResults(response.data.transactions);
                    setTotal(response.data.total);
                    console.log(response);
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
                    amount: data.amount < 0 ? data.amount * -1 : data.amount,
                    tag_id: data.tag_id,
                    expense: expense,
                    currency_id: data.currency_id,
                    recurrence: data.recurrence,
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
                    tag_id: data.tag_id,
                    expense: expense,
                    currency_id: data.currency_id,
                    recurrence: data.recurrence,
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
        // const exchange = () => {
        //     axios
        //         .get("https://api.exchangeratesapi.io/latest", {
        //             headers: {
        //                 "Test-Header": "test-value"
        //             }
        //         })
        //         .then(response => {
        //             // setResults(response.data);
        //             // setTotal(response.data.total);
        //             console.log(response, "exchange");
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         });
        // };
        const columns = [
            {
                title: "Amount",
                dataIndex: "amount"
            },
            {
                title: "Currency",
                dataIndex: "currency_id"
            },
            {
                title: "Category",
                dataIndex: "tag_id"
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
            const current = results.filter(curr => curr.id === id);

            setCurrentId(id);
            setAmount(current.amount);
            setCurrency(current.currency);
            setTag(current.tag);
            setDate(current.date);
        };

        useEffect(() => {
            handleResult();
        }, []);

        // const amountArr = results.map((res, index) => {
        //     return res.amount;
        // });
        // const totalAmount = amountArr.reduce((acc, res) => acc + res, 0);

        const onChange = e => {
            console.log("radio checked", e.target.value);
            setValue(e.target.value);
        };
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
                    <Form.Item name="recurrence">
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={1}>None</Radio>
                            <Radio value={2}>Daily</Radio>
                            <Radio value={3}>Weekly</Radio>
                            <Radio>Monthly</Radio>
                        </Radio.Group>
                    </Form.Item>
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
                            <h3 style={{ color: "#ec3b83" }}>TOTAL </h3>

                            {total.map(sum => (
                                <div>
                                    <span>{sum.name}</span>
                                    <span>{sum.sum}</span>
                                </div>
                            ))}
                            {/* <Button type="default" onClick={exchange}>
                                Exchange
                            </Button> */}
                            {/* <Select style={{ width: 120 }}>
                                {total.map(sum => (
                                    <Option value={sum.name}>{sum.name}</Option>
                                ))}
                            </Select> */}

                            <Divider />
                            <Space direction="vertical" size={12}>
                                <RangePicker
                                    defaultValue={[
                                        moment("2015/01/01", dateFormat),
                                        moment("2015/01/01", dateFormat)
                                    ]}
                                    format={dateFormat}
                                />
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
