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
                console.log(response, "response currency one");
                // setNewTitle("");
                loadData();
            })
            .catch(error => {
                console.log(error, "tag hasnt added on DB");
            });
    };

    const addNewCurrencyName = () => {
        newTitle.includes(...currencies) ? console.log("asd") : addCurrency();
        setNewTitle("");
    };

    const error = () => {
        Modal.error({
            title: "This is an error message",
            content: "some messages...some messages..."
        });
    };

    return (
        <Form.Item
            label="Currency"
            name="currency"
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
                              <Option key={item.id} value={item.name}>
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
