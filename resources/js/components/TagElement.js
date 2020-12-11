import React, { useState } from "react";
import { Select, Input, Divider, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const TagElement = ({ tags, loadData }) => {
    const { Option } = Select;
    const [newTitle, setNewTitle] = useState("");

    const addTag = () => {
        axios({
            method: "post",
            url: "/api/tag",
            data: {
                name: newTitle
            }
        })
            .then(response => {
                console.log(response, "addTag result");
                loadData();
            })
            .catch(error => {
                console.log(error, "tag hasnt added on DB");
            });
    };

    const addNewTagName = () => {
        newTitle.includes(...tags) ? setTags() : addTag();
        setNewTitle("");
    };
    return (
        // <Form.Item
        //     label="Tag"
        //     name={"tag"}
        //     value={tags}
        //     // rules={[
        //     //     {
        //     //         required: true,
        //     //         message: "Please pick a tag!"
        //     //     }
        //     // ]}
        // >
        <Select
            mode="multiple"
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
                            onClick={addNewTagName}
                        >
                            <PlusOutlined /> Add item
                        </a>
                    </div>
                </div>
            )}
        >
            {!!tags?.length
                ? tags.map(item => {
                      return (
                          <Option key={item.name} value={item.name}>
                              {item.name}
                          </Option>
                      );
                  })
                : null}
        </Select>
        // </Form.Item>
    );
};

export default TagElement;
