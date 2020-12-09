import React, { useState } from "react";
import { Select, Input, Divider, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const DropDownInput = ({ taggs, currencyy }) => {
    const { Option } = Select;
    const [newTitle, setNewTitle] = useState("");
    const [currencies, setCurrencies] = useState(["GBP", "EURO", "USD"]);
    const [tags, setTags] = useState(["Beauty", "Shopping"]);
    const [recurring, setRecurring] = useState(["daily", "weekly", "monthly"]);

    return (
        <Form.Item
            label={taggs ? "Tag" : "Currency"}
            name={taggs ? "tag" : "currency"}
            value={taggs ? "tag" : "currency"}
            rules={[
                {
                    required: true,
                    message: "Please pick an input!"
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
                                onClick={() => {
                                    setCurrencies([...currencies, newTitle]);
                                    () => {
                                        setTags([...tags, newTitle]);
                                    };
                                    setNewTitle("");
                                }}
                            >
                                <PlusOutlined /> Add item
                            </a>
                        </div>
                    </div>
                )}
            >
                {taggs
                    ? !!tags?.length
                        ? tags.map(item => {
                              return <Option key={item}>{item}</Option>;
                          })
                        : null
                    : ""}

                {currencyy
                    ? !!currencies?.length
                        ? currencies.map(item => {
                              return <Option key={item}>{item}</Option>;
                          })
                        : null
                    : ""}
            </Select>
        </Form.Item>
    );
};

export default DropDownInput;
