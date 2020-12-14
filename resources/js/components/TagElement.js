import React, { useState } from "react";
import { Select, Input, Divider, Form, Modal } from "antd";
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
            content: "You have already added that tag"
        });
    };

    const addNewTagName = () => {
        const tagsArr = Object.values(tags);
        const tag = tagsArr.map(item => item.name);
        tag.includes(newTitle) ? errorAlert() : addTag();
        setNewTitle("");
    };

    return (
        <Form.Item
            label="Tag"
            name={"tag_id"}
            value={tags}
            rules={[
                {
                    required: true,
                    message: "Please pick a tag!"
                }
            ]}
        >
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

export default TagElement;
