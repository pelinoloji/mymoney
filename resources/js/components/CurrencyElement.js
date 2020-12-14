import React, { useState } from "react";
import { Select, Input, Divider, Form, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CurrencyElement = ({ currencies, loadData }) => {
    const { Option } = Select;
    const [newTitle, setNewTitle] = useState("");

    const addCurrency = () => {
        axios({
            method: "post",
            url: "/api/currency",
            data: {
                name: newTitle
            }
        })
            .then(response => {
                console.log(response, "response currency list");
                setNewTitle("");
                loadData();
            })
            .catch(error => {
                console.log(error, "tag is not added on DB");
            });
    };

    const errorAlert = () => {
        Modal.error({
            title: "This is an error message",
            content: "bla bla"
        });
    };

    const addNewCurrencyName = () => {
        newTitle.includes(...currencies) ? errorAlert : addCurrency();
        setNewTitle("");
    };

    return (
        <Form.Item
            label="Currency"
            name="currency_id"
            value={currencies}
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
                                onChange={e => setNewTitle(e.target.value)}
                            />
                            <a
                                style={{
                                    flex: "none",
                                    padding: "8px",
                                    display: "block",
                                    cursor: "pointer"
                                }}
                                onClick={addNewCurrencyName}
                            >
                                <PlusOutlined /> Add item
                            </a>
                        </div>
                    </div>
                )}
            >
                {!!currencies?.length
                    ? currencies.map(item => {
                          return (
                              <Option key={item.id} value={item.id}>
                                  {item.name}
                              </Option>
                          );
                      })
                    : null}
            </Select>
        </Form.Item>
    );
};

export default CurrencyElement;
