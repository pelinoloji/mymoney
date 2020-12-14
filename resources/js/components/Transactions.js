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
    Radio,
    Tag
} from "antd";
import moment from "moment";
import "../../sass/app.scss";

import TagElement from "./TagElement";
import CurrencyElement from "./CurrencyElement";

const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

const Transactions = ({ expense }) => {
    try {
        const [results, setResults] = useState([]);
        const [amount, setAmount] = useState(0);
        const [currencies, setCurrencies] = useState([]);
        const [tags, setTags] = useState([]);
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

        const loadData = () => {
            axios
                .get("/api/transactions")
                .then(response => {
                    setResults(response.data.transactions);
                    setTotal(response.data.total);
                    setTags(response.data.tags);
                    setCurrencies(response.data.currencies);
                    console.log(response, "get transactions response");
                })
                .catch(error => {
                    console.log(error);
                });
        };

        const addTransaction = data => {
            const payload = {
                amount: expense ? data.amount * -1 : data.amount,
                tag_id: Number(data.tag_id),
                expense: expense,
                currency_id: data.currency_id,
                recurrence: data.recurrence,
                transaction_date: data.transaction_date.format("YYYY-MM-DD")
            };

            axios({
                method: "post",
                url: "/api/transactions",
                data: payload
            })
                .then(response => {
                    console.log(response, "add transaction result");
                    loadData();
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
                    amount: expense ? data.amount * -1 : data.amount,
                    tag_id: data.tag_id,
                    expense: expense,
                    currency_id: data.currency_id,
                    recurrence: data.recurrence,
                    transaction_date: data.transaction_date.format("YYYY-MM-DD")
                }
            }).then(response => {
                console.log(response.data, "update transaction result");
                setCurrentId(0);
                loadData();
            });
        };

        const deleteTransaction = id => {
            axios.delete(`api/transactions/${id}`).then(response => {
                console.log(response, "delete transaction response");
                loadData();
            });
        };

        const columns = [
            {
                title: "Amount",
                dataIndex: "amount",
                render: amount => (amount < 0 ? amount * -1 : amount)
            },
            {
                title: "Currency",
                dataIndex: "currencies.name"
            },
            {
                title: "Tag",
                dataIndex: ["tag", 0, "name"]
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
            setCurrencies(current.currencies);
            setTags(current.tags);
            setDate(current.date);
            loadData();
        };

        useEffect(() => {
            loadData();
        }, []);

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

                    <CurrencyElement
                        currencies={currencies}
                        loadData={loadData}
                    />

                    <TagElement tags={tags} loadData={loadData} />

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
                </Form>
                <Divider />
                {!currentId ? (
                    <div>
                        <h3 style={{ color: "#ec3b83" }}>TOTAL </h3>
                        {total.map(sum => (
                            <div key={sum.name}>
                                <span>{sum.name}</span>
                                <span>{sum.sum}</span>
                            </div>
                        ))}
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
            </>
        );
    } catch (err) {
        console.log(err, "render");
        return null;
    }
};
export default Transactions;
